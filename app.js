const express = require('express');
//paikallisesti 8080-portti, PORT isolla niin toimii serverillä
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const material_controller = require('./material_controller');

//npm init
//npm install express
//npm install mongoose
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
} ); //GET api/materials

// GET /index.html
// --> /public/index.html
app.use("/", express.static("public"));

// RESTful api
// CRUD operations

// create
app.post("/api/material", material_controller.api_post_material);

// api.domain.com/materials
// read
app.get("/api/materials", material_controller.api_get_materials);


// update
//app.patch korvaa vain tietyt kentät
//app.put korvaa kaikki kentät
app.put("/api/material/:id", material_controller.api_put_material);

// delete
app.delete("/api/material/:id", material_controller.api_delete_material);

// npm install mongoose
//"mongodb+srv://admin:Bzxwbu5l5P9aDFhi@cluster0-iklya.mongodb.net/test?retryWrites=true&w=majority" /test? alikansio databasessa
//muutettiin materialdb:ksi
const database_uri = "mongodb+srv://admin:Bzxwbu5l5P9aDFhi@cluster0-iklya.mongodb.net/materialdb?retryWrites=true&w=majority";
// Bzxwbu5l5P9aDFhi
mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( ()=>{
    console.log('database connected');
    app.listen(port);
}).catch(err=> {
    console.log(err);
});

//app.listen(port);