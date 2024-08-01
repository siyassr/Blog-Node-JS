const express = require("express");
const controller = require("../controller/controller")
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const adminController = require("../controller/adminController")
const { authenticate } = require('../middleware/authMIddleware')
const {adminOnly}  = require("../middleware/adminAuth")
const router = express.Router()

router.get("/",controller.home)
router.get("/login",controller.login)
router.get("/register",controller.register)
router.get("/admin",controller.adminlog)


// router.get("/post", authenticate, controller.post)


router.post("/register",userController.signUp)
router.post("/login",userController.userlogin)
router.get("/logout",userController.logOut)

router.post("/post",authenticate,postController.createPost)
router.get("/post",authenticate,postController.getAllPost)
router.get("/page/:id",authenticate,postController.getPostById)
router.delete("/page/:id",authenticate,postController.deletePost)
router.put("/page/:id",authenticate,postController.editPost)

router.get("/admin/users",adminOnly,adminController.adminUser)
router.post("/admin/users",adminController.logAdmin)
router.put("/admin/users/:id",adminOnly,adminController.adminUserEdit)
router.get("/admin/user/:id",adminOnly,adminController.adminUserById)
router.delete("/admin/users/:id",adminOnly,adminController.adminDelete)


// router.get("/admin/post",adminOnly,adminController.adminPost)
router.get("/admin/post/:id",adminOnly,adminController.adminPostById)
router.delete("/admin/post/:id",adminOnly,adminController.adminDeletePost)
router.put("/admin/post/:id",adminOnly,adminController.adminEditPost)
router.get('/admin/user/post/:id',adminOnly,adminController.specificUserPost)

module.exports = router