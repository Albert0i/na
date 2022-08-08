require('dotenv').config()
const express = require('express')
var methodOverride = require('method-override')
const session = require("express-session");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const { format } = require('date-fns'); 

const app = express()
const port = process.env.PORT || 3000
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')

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
    res.status(200).send('Hello, Server...')
})

app.use('/task', taskRoute)
app.use('/user', userRoute)

app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`)
})
