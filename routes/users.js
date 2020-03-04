//Require lib express
const express = require('express');

//Require lib de rotas
const router = express.Router();

//Criando endpoints
//GET
router.get('/1', (req,res) => {
    return res.send({message: `Olá, eu sou um GET em /users`});
})
//POST
router.post('/', (req,res) => {
    return res.send({message: `Olá, eu sou um POST em /users`});
})
//POST create user
router.post('/create', (req,res) => {
    return res.send({message: `Usuário criado com sucesso. =)`})
})
//Export router
module.exports = router;


//MONGO
//URL CONNECTION -> mongodb+srv://<username>:<password>@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority
//USER: renato
//PASS: Sat3t3ll