const auth = (req, res, next) => {    
  
    if (req.session.username) 
      next()
    else 
      res.redirect('/user/login')
  };
  
  module.exports = auth;
  