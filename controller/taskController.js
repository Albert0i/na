const { format } = require('date-fns'); 
const Task = require('../model/Task');

const task_index = (req, res) => {
    console.log(`req.query.id=${req.query.id}`)
    //console.log(`req.body.id=${req.body.id}`)
    Task.find({ taname: req.session.username })
        .then(data => {
            res.render('task/index', {
                taname: req.session.username, 
                tatype: '工作', 
                tadate: format(new Date(), 'yyyyMMdd'),
                tasks: data } )
        })
        .catch(err => {
            console(err)
        })
}

const task_create = (req, res) => {
    Task.create(req.body)
    .then((data) => { 
        console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

const task_delete = (req, res) => {
    console.log(`id=${req.params.id}`)
    Task.deleteOne({ _id: req.params.id } )
    .then((data) => { 
        console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

const task_update = (req, res) => {
    console.log(`id=${req.params.id}`)
    // Task.deleteOne({ _id: req.params.id } )
    // .then((data) => { 
    //     console.log(data) 
    //     res.redirect('/task')
    // } )
    // .catch((err) => { 
    //     console.log(err)
    // } )
}

module.exports = {
    task_index, 
    task_create,
    task_delete,
    task_update
  }