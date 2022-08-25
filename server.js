const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('./ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

// Begin your express configuration 
require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit')
const methodOverride = require('method-override')
const session = require("express-session");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const { format } = require('date-fns'); 
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000
const port_https = process.env.PORT_HTTPS || 443
const max_request = process.env.MAX_REQUEST_PER_MINUTE || 100

const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')

const requestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: max_request,         // limit each IP to max requests per windowMs 
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
})
// Use the limit rule as an application middleware
app.use(requestLimiter)
// logging
app.use(morgan('dev'))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded( {extended: true}))
// parse json data sent by javascript
app.use(express.json())
// use ejs as view engine
app.set('view engine', 'ejs')

// Local session
let sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true, 
    cookie: { 
      maxAge: 30 * 60 * 1000   // in milliseconds
    }
}
// if Redis is defined, it should be Redis session
if (process.env.REDIS_URI)
{
    let RedisStore = require("connect-redis")(session);
    let RedisClient = new Redis(process.env.REDIS_URI);
    sess.store = new RedisStore({ client: RedisClient })
    RedisClient.on('connect', () => {
        console.log('Connected to Redis Server.')
        RedisClient.set('hello', format(new Date(), 'yyyy-MM-dd hh:mm:ss'));
    })    
}
app.use(session(sess))

const connectWithRetry = () => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      })
      .then(() => console.log("Connected to MongoDB Server"))
      .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
      });
  };  
connectWithRetry();
mongoose.connection.on("reconnected", () => console.log('Re-connected to MongoDB Server'));

// home page
app.get('/', (req, res) => {
  let msg = `Your pid is ${process.pid}.`
  let msg2 = `, cluster instance is ${process.env.NODE_APP_INSTANCE}`  
  msg += (process.env.NODE_APP_INSTANCE? msg2 : '.')
  console.log(msg)
  res.status(200).send(msg)
})  

app.use('/task', taskRoute)
app.use('/user', userRoute)

// 404 page
app.all('*', (req, res) => {
  res.status(404).render('404');
});

// End your express configuration 
// app.listen(port, () => {
//     console.log(`Application started on port ${port}`)
//     if (process.env.PUBLIC_IP)
//       console.log(`http://${process.env.PUBLIC_IP}:${port}/task`)    
// })

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, ()=>{
    console.log(`Application started on port ${port}`)
    if (process.env.PUBLIC_IP)
      console.log(`http://${process.env.PUBLIC_IP}:${port}/task`)    
});

httpsServer.listen(port_https, ()=>{
    console.log(`Application started on port ${port_https}`)
});

// Catching uncaught exceptions
// https://nodejs.dev/en/learn/error-handling-in-nodejs
process.on('uncaughtException', err => {
  console.error('.-----------------------------.')
  console.error('| There was an uncaught error |')
  console.error("'-----------------------------'")
  console.error(err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

/*
  Reference: 
  pm2 
  https://pm2.keymetrics.io/
  
  
  pm2 start server.js --name na --watch

  pm2 start ecosystem.config.js
*/