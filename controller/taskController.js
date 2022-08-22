const Task = require('../model/Task');
const Option = require('../model/Option');
const { format } = require('date-fns'); 

const task_index = async (req, res) => {
    let options = await Option.find()
        .sort({'tord': 1})
    
    Task.find({ taname: req.session.username })
        .select({ createdAt: 0, updatedAt: 0 } )
        .then(data => {
            let t = {
                    tatype: '工作', 
                    tadate: format(new Date(), 'yyyyMMdd'),
                    taappnum: '',
                    tafamrep: '',
                    taremark: '',
                }                            
            if (req.query.id)
            {
                t = data.find(e => e._id == req.query.id)
                //console.log(t)
            }

            res.render('task/index', {
                id: req.query.id,
                taname: req.session.username, 
                tatype: t.tatype, 
                tadate: t.tadate,
                taappnum: t.taappnum,
                tafamrep: t.tafamrep,
                taremark: t.taremark,

                tasks: data,
                options
             } )
        })
        .catch(err => {
            console.log(err)
        })
}

const task_create = (req, res) => {
    Task.create(req.body)
    .then((data) => { 
        //console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

const task_delete = (req, res) => {    
    Task.deleteOne({ _id: req.params.id } )
    .then((data) => { 
        //console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

const task_update = (req, res) => {
    Task.findByIdAndUpdate(req.body.id, req.body)
    .then((data) => { 
        //console.log(data) 
        res.redirect('/task')
    } )
    .catch((err) => { 
        console.log(err)
    } )
}

module.exports = {
    task_index, 
    task_create,
    task_delete,
    task_update
  }
