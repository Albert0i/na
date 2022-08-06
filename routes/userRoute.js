const express = require('express')
const router = express.Router()
const { user_login, user_process_login, user_signup } = require('../controller/userController')

router.get('/login', (req, res) => user_login(req, res))

router.post('/login', (req, res) => user_process_login(req, res))

router.get('/signup', (req, res) => user_signup(req, res))

module.exports = router