const User = require("../models/userModel")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {createUser} = require("../services/userService")

exports.signUp = async(req,res)=>{
    try{
        const {username,password} = req.body;
        console.log(username,password);
        const hashedPass = await bycrypt.hash(password,10)
        console.log("hashed password :",hashedPass)
        await createUser(username,hashedPass)
        res.redirect("/login")
    }catch(err){
        res.status(500).send(err.message)
    }
}

exports.userlogin = async(req,res)=>{
    try{
     const {username,password} = req.body
     const user = await User.findOne({username:username})

     if(user && await bycrypt.compare(password ,user.password)){
        const token = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        res.cookie("user_token",token,{httpOnly:true});
        res.redirect("/post")
     }else{
        res.status(401).send(err.message)
     }

    }catch(err){
        res.status(500).send(err.message)
    }
}
exports.logOut = async(req,res)=>{
    console.log("dcnjasdhcbwbdci");

    res.clearCookie('user_token', { httpOnly: true });
    res.redirect('/');

    

}