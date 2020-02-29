//Require lib express
const express = require('express');
const app = express();

//Rota teste - GET
app.get('/', (req,res) => {
    return res.send({message: "Hello World Flat earth - GET"})
})

//Rota teste - POST
app.post('/', (req,res) => {
    return res.send({message: "Hello World Globe earth - POST"})
})

//Listen port
app.listen(3000);

 //Export module
 module.exports = app;