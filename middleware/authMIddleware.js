const jwt = require('jsonwebtoken');
// const User = require('../models/userModels');

const User = require('../models/userModel')

exports.authenticate = async (req, res, next) => {
  const token = req.cookies?.user_token;
//   console.log(token);
  if (!token) return res.redirect('/login');

   try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decoded.userId;

    // console.log("ID", id);

    const user = await User.findById(id);
    req.user = user;
    next();
   }catch(err){
    res.status(400).send(err.message)

   }   
};


