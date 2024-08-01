const User = require("../models/userModel")
const Post = require("../models/postModels")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

//admin login

exports.logAdmin = async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if (user && user.role === 'admin'&& await bcrypt.compare(password, user.password)){
        const token = jwt.sign({ userId: user._id },process.env.ACCESS_TOKEN_SECRET);
        res.cookie('user_token', token).redirect('/admin/users');
      } else {
        res.send('Invalid credentials');
      }
}

exports.adminUser = async(req,res)=>{
  try{
    
    

    const user =  await User.find({role:'user'})
    // console.log(user)
    res.render("users",{user})
  }catch(err){
    res.status(500).send("err.message")
  }

}

exports.adminUserEdit = async(req,res)=>{
  try{
   const user = await User.findByIdAndUpdate(req.params.id,{username:req.body.username,role:req.body.role})
   //await user.save()
   res.redirect(`/admin/users`)
  }catch(err){
    res.status(500).send(err.message)
  }
}
exports.adminUserById = async(req,res)=>{
  try{
    const user = await User.findOne({_id:req.params.id})
  
    res.render("user",{user})
  }catch(err){
    res.status(400).send(err.message)
  }
}

exports.adminDelete  = async(req,res)=>{
   try{
     await User.findByIdAndDelete(req.params.id);
     console.log(req.params.id)
     res.send("OK")
    //  res.redirect("/admin/users")
   }catch(err){
     res.status(404).send(err.message)
   }
}
exports.adminEditPost = async(req,res)=>{
  try{
  const {title,content} = req.body
  await Post.findByIdAndUpdate(req.params.id,{title:req.body.title,content:req.body.content})
  res.send("OK")
  }catch(err){
    res.status(404).send(err.message)
  }
}
exports.adminPostById = async(req,res)=>{
  try{
    const post = await Post.findOne({_id:req.params.id})
    res.render("editPost",{post})
    
  }catch(err){
    res.status(404).send(err.message)
  }
}
exports.adminDeletePost = async(req,res)=>{
 
  await Post.findByIdAndDelete(req.params.id)
  // res.redirect("/admin/post");
  res.status(200).json({message: 'deleted'});
}

exports.specificUserPost= async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }
      const post = await Post.find({ author: userId });
      if (!post) {
        return res.status(404).send('post not found');
    }
      res.render('adminPost', {user, post }); 
  } catch (err) {
      res.status(500).send('Server error');
  }
}