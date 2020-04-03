const express = require('express');

//paikallisesti 8080-portti, PORT isolla niin toimii serverillä
const port = process.env.PORT || 8080;

const app = express();

const material_controller = require('./material_controller');

//npm init
//npm install express
//npm install nodemon --save-dev
//npn run start-dev

const body_parser = require('body-parser');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); //material/id

app.use( (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
} ); //get api/materials

// RESTful api
// CRUD operations


// create
app.post("/api/material", material_controller.api_post_material);

// api.domain.com/materials
// read
app.get("/api/materials", material_controller.api_get_materials);


// update

// delete

app.listen(port);