var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    number: Number,
    author: String,
    image: String,
    text: String,
    comments: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          }        
    ]
});


module.exports = mongoose.model("Post", postSchema);