const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true,
        unique: true,
     },
     desc: {
        type: String,
        required: true,
     },
     postImg: {
         type: String,
         required: false,
     },
     username: {
         type: String,
         required: true,
     },
     category: {
         type: Array,
         required: false,
     },
},
   { timestamps: true }
);

module.exports = new mongoose.model("Post", postSchema);