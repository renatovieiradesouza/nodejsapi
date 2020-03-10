const express = require('express');
const router = express.Router();

//Rota teste - GET
router.get('/', (req,res) => {
    return res.send({message: "Hello users raiz - GET"})
});

//Rota teste - POST
router.post('/', (req,res) => {
    return res.send({message: "Hello users raiz - POST"})
});

//Criação de usuario
router.post('/create', (req,res) => {
    let obj = req.query;
    return res.send({message: `Olá, seu usuário foi criado com sucesso: ${obj.usuario}`})
});

//Delete usuario
router.delete('/create', (req,res) => {
    let obj = req.query;
    return res.send({message: `Usuário ${obj.usuario} deletado com sucesso!`})
});

module.exports = router;