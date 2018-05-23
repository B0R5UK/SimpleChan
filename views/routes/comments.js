var express = require("express");
var router = express.Router();
var Post = require("../../models/post.js");
var Comment = require("../../models/comment.js");
var multer  = require('multer');
var get_ip = require('ipware')().get_ip;
//GET IP
router.use(function(req, res, next) {
     var ip_info = get_ip(req);
     console.log(ip_info);
     // { clientIp: '127.0.0.1', clientIpRoutable: false }
     next();
 });


//MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
  }
});
//MULTER

var upload = multer({ storage: storage });


router.post("/:boardname/:postid/newcomment",upload.single('commentimage'), function(req, res){
    var imagesrc = "/uploads/" + req.file.filename;
    var getip=get_ip(req);
    var newComment={ipadress:getip.clientIP,author: req.body.author, image: imagesrc, text: req.body.text};
    Post.findById(req.params.postid, function(err, post) {
       if(err){
           console.log("error finding post" + err);
            res.redirect("/post/" + req.params.id);
       } else {
           Comment.create(newComment,function(err,comment){
            if(err){
                console.log("error ccreating comment: " + err);
            }  else{
                post.comments.push(comment);
                post.save();
                res.redirect("/simplechan/" + req.params.boardname + "/" + req.params.postid + "/");
            }
           });
        }
    });
});

module.exports = router;
