const User = require("../models/userModel")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

async function createUser(username , hashedPass){
    console.log('Hellloooo');
    console.log(username,hashedPass);
    const password  =  hashedPass;
    const user = new User({username,password});
    console.log(user);
    await user.save();
}

// async function logUser(username){
//     const user = await User.findOne({username:username})
//     console.log(user)
// }

module.exports = {createUser}