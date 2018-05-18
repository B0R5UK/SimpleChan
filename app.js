var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var Post = require("/models/post.js");
// var Comment = require("./models/comment.js");
// var Board = require("./models/board.js");
var multer  = require('multer');
var createBoards = require("./seed.js");

//DATABASE
mongoose.connect("mongodb://localhost/blogtest");

//createBoards();

app.use(bodyParser.urlencoded({extended: true})); //bodyparser
app.use(express.static(__dirname + "/public")); //static folder

var postsRoutes = require("./views/routes/posts.js");
var commentRoutes = require("./views/routes/comments.js");

app.use(postsRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
console.log("server started!");
});