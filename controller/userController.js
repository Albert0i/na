const User = require("../model/User");
const bcrypt = require("bcryptjs");

const user_signup = (req, res) => {
    res.render('user/signup', {})
}

const user_process_signup = async (req, res) => {
    const { username, password, password2, tunamec, tunamep } = req.body;

    try {
            const hashpassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                username,
                password: hashpassword,
                tunamec, 
                tunamep
            });
            console.log(newUser)
            res.redirect('/user/login')
        } catch (e) {
            console.log(e)
        }
}

const user_login = (req, res) => {
    res.render('user/login')
}

const user_process_login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        req.session.username=undefined
        res.render('user/login', { username, 
                                   password, 
                                   message: 'Invalid username'})
      }
      else 
      {
        const isCorrect = await bcrypt.compare(password, user.password);
  
        if (isCorrect) {
              req.session.username=username
              res.redirect('/task')
        } else {
              req.session.username=undefined
              res.render('user/login', { username, 
                                         password, 
                                         message: 'Invalid password'})
        }
      }      
    } catch (e) {
        console.log(e)
        req.session.username=undefined        
        res.render('user/login', { username, 
                                   password, 
                                   message: e })

    }
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

    // if (((req.body.username==='alberto') && (req.body.password==='123')) || 
    //     ((req.body.username==='bonnie') && (req.body.password==='456')) || 
    //     ((req.body.username==='noname') && (req.body.password==='789')) )
    // {
    //     req.session.username=req.body.username
    //     res.redirect('/task')
    // }
    // else
    // {
    //     req.session.username=undefined
    //     res.render('user/login', { username: req.body.username, 
    //                                password: req.body.password, 
    //                                message: 'Invalid username and/or password'})
    // }
