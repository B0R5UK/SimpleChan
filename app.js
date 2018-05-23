var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');
// var Post = require("/models/post.js");
// var Comment = require("./models/comment.js");
// var Board = require("./models/board.js");
var multer  = require('multer');
var createBoards = require("./seed.js");
var path = require("path");
console.log(path.dirname(process.execPath));

//DATABASE
mongoose.connect("mongodb://localhost/simplechan");

createBoards();

app.use(bodyParser.urlencoded({extended: true})); //bodyparser

app.use('*/javascript',express.static(path.join(__dirname, 'public/javascript')));
app.use('*/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('*/uploads',express.static(path.join(__dirname, 'public/uploads')));

var postsRoutes = require("./views/routes/posts.js");
var commentRoutes = require("./views/routes/comments.js");

app.use(postsRoutes);
app.use(commentRoutes);

app.listen('3000', function(){
console.log("server started on port 3000");
});
