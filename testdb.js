require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./model/Task');
const DB_URI = process.env.DB_URI;

console.log('Please wait while connecting to', DB_URI);
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => { 
    console.log('Application started.');
    Task.create(
      {
        taname: "容志強",
        tatype: "工作記錄",
        tadate: 20220803,
        taappnum: 'R123456',
        tafamrep: '陳大文',
        taremark:'lorem...'
      }
    )
  } )
  .catch(err => {
    console.log('An error has occurred while connecting to MongoDB...')
    console.log(err);
    console.log('Application aborted.')
  });
