const Post = require("../models/postModels");
// const  = require("../Middleware/authMIddleware")

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.user._id);
    const author = req.user._id
    const post = new Post({ title, content,author:author});
    await post.save();
    res.status(200).redirect("/post");

    // const post = new Post({title,content,author:})
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllPost = async (req, res) => {

  try {
    const userId = req.user._id;
    console.log(userId)
    const post = await Post.find({author:userId})
    console.log("sclksncndcnn",post)
    res.render("post",{post});
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id
    console.log(postId);
    const post = await Post.findById({ _id:postId });
    console.log(post)
    res.render("page", { post });
    // console.log("helooo user");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePost = async (req, res) => {
  console.log("heloo delete");
  try{
    await Post.findByIdAndDelete(req.params.id)
   res.send("OK")
  }catch(err){
 res.status(400).send(err.message)
  }
  // try {
  //   const post = await Post.findById(id);
  //   if (!post || post.author.toString() !== req.user._id.toString()) {
  //     return res.status(400).send("Not authorized");
  //   }
  //   await post.remove();
  //   res.send("Post deleted successfully");
  // } catch (error) {


  //   res.status(500).send(error.message);
  // }
};

exports.editPost = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const { title, content } = req.body;
  
      // const post = await Post.findById({_id :userId});
          const post = await Post.findByIdAndUpdate(
          { _id: postId },
          { title: title, content: content },
          { new: true } // This option returns the updated document
          );
     res.send('OK')
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  