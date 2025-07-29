import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

var rangex = [];
var rangey = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/generate", (req, res)=>{
    var coordinates = generate(req.body.selectX, req.body.selectY);
    GenerateClues(coordinates);
    res.render("index.ejs", {lenghtX: req.body.selectX, lenghtY: req.body.selectY, coordinates: coordinates});
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
    return coordinates;
}

function GenerateClues(coordinates){
    var cluesX =[];
    var clue = 1;
    var column = 0;
    var row = 0;
    coordinates.sort();
    coordinates.forEach((coordinate, index) => {
        if (index === 0)
            {return;}//Buscar la manera de que se registre si solamente el primer número de la columna es consecutivo 
        else if(coordinate[0]==coordinates[index-1][0]){
            if(coordinate[1]==(coordinates[index-1][1])+1){
                clue++;
            }else{
                cluesX.push([column, clue]);
                clue = 1;
            }
        }else{
            column++;//reemplazar por el index de la columna
        }
    });
    console.log(cluesX);
}