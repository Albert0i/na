const user_login = (req, res) => {
    res.render('user/login')
}

const user_process_login = (req, res) => {
    if (((req.body.username==='alberto') && (req.body.password==='123')) || 
        ((req.body.username==='bonnie') && (req.body.password==='456')) || 
        ((req.body.username==='noname') && (req.body.password==='789')) )
    {
        req.session.username=req.body.username
        res.redirect('/task')
    }
    else
    {
        req.session.username=undefined
        res.render('user/login', { username: req.body.username, 
                                   password: req.body.password, 
                                   message: 'Invalid username and/or password'})
    }
}

const user_signup = (req, res) => {
    res.render('user/signup', {})
}

const user_process_signup = (req, res) => {
    res.render('user/login', {})
}

const user_logout = (req, res) => {
    req.session.destroy()
    res.render('user/login', {})
}

module.exports = {
    user_login, 
    user_process_login, 
    user_signup, 
    user_process_signup, 
    user_logout 
  }