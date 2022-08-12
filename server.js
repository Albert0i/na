require('dotenv').config()
const express = require('express')
var methodOverride = require('method-override')
const session = require("express-session");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const { format } = require('date-fns'); 
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,                 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware
app.use('/', apiLimiter)

app.use(morgan('dev'))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.static('public'))
app.use(express.urlencoded( {extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

// Local session
let sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
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

app.get('/', (req, res) => {
  let msg = `Your pid is ${process.pid}, cluster instance is ${process.env.NODE_APP_INSTANCE}`
  console.log(msg)
  res.status(200).send(msg)
})  

app.use('/task', taskRoute)
app.use('/user', userRoute)

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`)
    if (process.env.PUBLIC_IP)
      console.log(`http://${process.env.PUBLIC_IP}:${port}/task`)    
})
/*
  pm2 
  https://pm2.keymetrics.io/

  pm2 start server.js --name na --watch

  pm2 start ecosystem.config.js
*/