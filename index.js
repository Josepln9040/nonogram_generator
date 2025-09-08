import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

var rangex = [];
var rangey = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/generate", (req, res)=>{
    var coordinates = generate(req.body.selectX, req.body.selectY);
    res.render("index.ejs", {lengthX: req.body.selectX, lengthY: req.body.selectY, coordinates: coordinates, cluesX : GenerateCluesX(coordinates), cluesY : GenerateCluesY(coordinates)});
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

    const numberOfTiles = Math.floor(Math.random()*(gridx*gridy)) + 5;
    var coordinates = [];

    populate(gridx, gridy);
    for(var i=0; i <= numberOfTiles ; i++){
        var randomIndexX = Math.floor(Math.random() * rangex.length);
        var randomIndexY = Math.floor(Math.random() * rangey.length);

        coordinates.push([rangex[randomIndexX], rangey[randomIndexY]]);
    }
    return coordinates;
}

function GenerateCluesX(rawCoordinates){
    rawCoordinates.sort();
    var coordinates =  Array.from(
        new Set(rawCoordinates.map(JSON.stringify)),
        JSON.parse);

    const grouped = {};

    for (const [x, y] of coordinates) {
    if (!grouped[x]) grouped[x] = [];
    grouped[x].push(y);
    }

    const result = [];

    // Paso 2: Procesar cada grupo
    for (const col in grouped) {
    const yValues = grouped[col].sort((a, b) => a - b);

    let count = 1;

    for (let i = 1; i < yValues.length; i++) {
        if (yValues[i] === yValues[i - 1] + 1) {
        count++;
        } else {
        result.push([parseInt(col), count]);
        count = 1;
        }
    }
    // Push the last count
    result.push([parseInt(col), count]);
    }
    
    return(result);
}

function GenerateCluesY(rawCoordinates){
    rawCoordinates.sort();
    var coordinates =  Array.from(
        new Set(rawCoordinates.map(JSON.stringify)),
        JSON.parse);

    const grouped = {};

    for (const [x, y] of coordinates) {
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(x);
    }

    const result = [];

    // Paso 2: Procesar cada grupo
    for (const col in grouped) {
    const xValues = grouped[col].sort((a, b) => a - b);

    let count = 1;

    for (let i = 1; i < xValues.length; i++) {
        if (xValues[i] === xValues[i - 1] + 1) {
        count++;
        } else {
        result.push([parseInt(col), count]);
        count = 1;
        }
    }
    // Push the last count
    result.push([parseInt(col), count]);
    }
    
    return(result);
}

function fill(){

}