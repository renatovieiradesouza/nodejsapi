//Require lib express
const express = require('express');

//Require lib de rotas
const router = express.Router();

//Criando endpoints
//GET
router.get('/', (req,res) => {
    return res.send({message: `Olá, eu sou um GET em /`});
})
//POST
router.post('/', (req,res) => {
    return res.send({message: `Olá, eu sou um POST em /`});
})

//Export router
module.exports = router;