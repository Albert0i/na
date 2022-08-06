const { format } = require('date-fns'); 
const Task = require('../model/Task');

const task_index = async (req, res) => {
    try {
        const tasks = await Task.find({ taname: req.session.username })

        res.render('task/index', {
            taname: req.session.username, 
            tatype: '工作', 
            tadate: format(new Date(), 'yyyyMMdd'),
            tasks } )
    }
    catch (err)
    {
        console(err)
    }    
}

const task_create_post = (req, res) => {
    Task.create(req.body)
    .then((data) => { 
        console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

module.exports = {
    task_index, 
    task_create_post
  }