var mongoose = require("mongoose");
var Board = require("./models/board.js");

var data = [
    {
        name: "/b/" 
    },
    {
        name: "/pepe/"
    }
];

function createBoards(){
    Board.remove({}, function(err){
            if(err){
            console.log(err);
    }
    console.log("removed boards!");
    data.forEach(function(seed){
        Board.create(seed, function(err, board) {
            if(err){
                console.log("error creating board" + err);
            } else {
                console.log("Created a board with name of : " + board.name);
            }
        });
    });
});

}

module.exports = createBoards;
