const Post = require("../models/postModels")
exports.home = async(req,res)=>{
    try {
        const post = await Post.aggregate([
            {
                $lookup:{
                    from:"users",
                    localField:"author",
                    foreignField:"_id",
                    as:"author"
                }
            },
            {
                $unwind: "$author"
            }
        ])
        
        res.render("blog",{post})
    } catch (error) {
        res.status(500).send(error.message);
    }
   
}
exports.login = (req,res)=>{
    res.render("login")
}

exports.register = (req,res)=>{
    res.render("register")
}
exports.adminlog = (req,res)=>{
    res.render("adminlogin")
}
exports.adminEdit=(req,res)=>{
    res.render("userEdit")
}
// exports.adminUser = async(req,res)=>{
//     try {
//         const post = await Post.aggregate([
//             {
//                 $lookup:{
//                     from:"users",
//                     localField:"author",
//                     foreignField:"_id",
//                     as:"author"
//                 }
//             },
//             {
//                 $unwind: "$author"
//             }
//         ])
//         // console.log(posts)
//         res.render("users",{post})
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
    
// }
// exports.page = async (req,res)=>{
//     try {
//         const post = await Post.aggregate([
//             {
//                 $lookup:{
//                     from:"users",
//                     localField:"author",
//                     foreignField:"_id",
//                     as:"author"
//                 }
//             },
//             {
//                 $unwind: "$author"
//             }
//         ])
//         // console.log(posts)
//         res.render("page",{post})
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
   
// }
