const User = require("../model/User");
const bcrypt = require("bcryptjs");

const user_signup = (req, res) => {
    res.render('user/signup')
}

const user_process_signup = (req, res) => {
    const { username, password, password2, tunamec, tunamep } = req.body;

    if (password === password2) 
    {
        const hashpassword = bcrypt.hashSync(password, 12);
        User.create({
            username,
            password: hashpassword,
            tunamec, 
            tunamep
        })
        .then(data => {
            console.log(data)
            res.redirect('/user/login')    
        })
        .catch(err => {
            console.log(err)
            res.render('user/signup', { username, 
                password, 
                password2, 
                tunamec, 
                tunamep, 
                message: err.message})
        })
    }        
    else
    {
        res.render('user/signup', { username, 
                                    password, 
                                    password2, 
                                    tunamec, 
                                    tunamep, 
                                    message: 'Passwords not match'})
    }
}

const user_login = (req, res) => {
    res.render('user/login')
}

const user_process_login =(req, res) => {
    const { username, password } = req.body;
      User.findOne({ username })
      .then (data => {
        const isCorrect = bcrypt.compareSync(password, data.password);
  
        if (isCorrect) {
              req.session.username=username
              res.redirect('/task')
        } else {
              req.session.username=undefined
              res.render('user/login', { username, 
                                         password, 
                                         message: 'Invalid password'})
        }
      })
      .catch(err => {
        req.session.username=undefined
        res.render('user/login', { username, 
                                   password, 
                                   message: 'Invalid username'})
      });
}

const user_logout = (req, res) => {
    req.session.destroy()
    res.render('user/login', {})
}

module.exports = {
    user_signup, 
    user_process_signup, 
    user_login, 
    user_process_login,     
    user_logout 
  }
