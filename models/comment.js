var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    number: Number,
    author: String,
    image: String,
    text: String
});


module.exports = mongoose.model("Comment", commentSchema);