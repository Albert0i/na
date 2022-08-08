const express = require('express')
const router = express.Router()
const { task_index, task_create, task_delete } = require('../controller/taskController')
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => task_index(req, res))

router.post('/new', (req, res) => task_create(req, res))

router.delete('/delete/:id', (req, res) => task_delete(req, res))

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    //console.log(req.userid)
    res.status(200).send(`A single task (${req.params.id})`)
})

router.param('id', (req, res, next, id) => {
    //req.userid = `user${id}`
    next()
})

module.exports = router