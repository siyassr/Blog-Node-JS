
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

exports.adminOnly = async (req, res, next) => {
    const token =  req.cookies?.user_token
    console.log(token);
    if (!token) return res.redirect('/');
    try{
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const id = decoded.userId;
  
      // console.log("ID", id);
  
      const user = await User.findById(id);
       if(user.role == 'admin'){
        req.user = user;
        next();
       }
       else{
        res.redirect('/')
       }
     
     }catch(err){
      res.status(400).send(err.message)
  
     }  
  };
  