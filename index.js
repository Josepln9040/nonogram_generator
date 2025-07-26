import body from "body-parser";
import express from "express";

const app = express();
const port = 3000;

var rangex = [];
var rangey = [];

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

function populate(gridx,gridy){
    for(var i=0; i <gridx; i++){
        rangex.push(i);
    }

    for( var i=0; i<gridy ;i++){
        rangey.push(i);
    }
}

function generate(gridx, gridy){

    const numberOfTiles = Math.floor(Math.random()*(gridx*gridy)) + 1;
    var coordinates = [];

    populate(gridx, gridy);
    
    for(var i=0; i <= numberOfTiles ; i++){
        var randomIndexX = Math.floor(Math.random() * rangex.length);
        var randomIndexY = Math.floor(Math.random() * rangey.length);

        coordinates.push([rangex[randomIndexX], rangey[randomIndexY]]);
    }

    console.log(coordinates);

}

generate(10,2);