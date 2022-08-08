const express = require('express')
const router = express.Router()
const { user_login, user_process_login, user_signup, user_process_signup, user_logout } = require('../controller/userController')

router.get('/login', (req, res) => user_login(req, res))
router.post('/login', (req, res) => user_process_login(req, res))

router.get('/signup', (req, res) => user_signup(req, res))
router.post('/signup', (req, res) => user_process_signup(req, res))

router.get('/logout', (req, res) => user_logout(req, res))

module.exports = router