const mongoose = require("mongoose")

    const postSchema = new mongoose.Schema({
        title: {
            type: String,
            // required: true,
        },
        // username:{
        //     type:String,

        // },
        content: {
            type: String,
            // required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            // required: true,
        },
    }, {
        timestamps: true,
    });

    module.exports = mongoose.model("posts",postSchema)