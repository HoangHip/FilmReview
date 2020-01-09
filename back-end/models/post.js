const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    link : {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
       type: String,
       required:true,
    },
    genre: {
        type: String,
        required:true,
    },
    date: {
        type: String,
    },
    active: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Active'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", PostSchema);

// {
//     image: "url",
//     title: "hello",
//     content: "hello",
//     author: {
//         /// author
//     },
//     active: {
//         /// active 
//     },
// }