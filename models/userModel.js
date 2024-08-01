const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
},{
    timestamps:true
})
module.exports = mongoose.model("users",userschema)