var mongoose = require("mongoose");

var boardSchema = new mongoose.Schema({
    name: String,
    posts: [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Post"
          }        
    ]
});


module.exports = mongoose.model("Board", boardSchema);