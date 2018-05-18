var express = require("express");
var router = express.Router();
var Post = require("../../models/post.js");
var Board = require("../../models/board.js");
var multer  = require('multer');

//MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
  }
})
//MULTER

var upload = multer({ storage: storage });

router.get("/",function(req,res){
            res.render("posts/landing.ejs");
    });


router.get("/:boardname/",function(req,res){
    Board
    .findOne({})
    .where("name").equals("/"+req.params.boardname+"/")
    .populate("posts").exec(function(err, foundBoard){
        
    if(err){
            console.log("posts index err: ",err);
        } else{
            res.render("posts/posts.ejs", {board:foundBoard, posts:foundBoard.posts});
        }
    });
});

router.post("/:boardname/newpost/", upload.single("image"), function(req, res){
    var imagesrc = "/uploads/" + req.file.filename;
    Board
    .findOne({})
    .where("name").equals("/"+req.params.boardname+"/")
    .exec(function(err, foundBoard){
        if(err){
            console.log("error finding Board" + err);
            res.redirect("/"+req.params.boardname+"/");
      } else {
          var newPost={number:foundBoard.posts.length + 1,author: req.body.author, image: imagesrc, text: req.body.text};
          Post.create(newPost,function(err,post){
                if(err){
                    console.log("error creating post: " + err);
                }  else{
                    foundBoard.posts.push(post);
                    foundBoard.save();
                    res.redirect("/"+req.params.boardname+"/");
                }  
            }
            );
      }
    });
});

router.get("/:boardname/:postid/", function(req, res){
    Post.findById(req.params.postid).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log("error finding post :",err);
        }else
        {
            res.render("posts/show.ejs", {boardname:req.params.boardname, post:foundPost});
        }
    });
});

module.exports = router;