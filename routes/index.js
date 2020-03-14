const express = require('express');
const router = express.Router();
const token = require('../middlewares/auth');

//Rota teste - GET
router.get('/', token, (req,res) => {
//Usando res.locals.auth_data para retornar dados do token, nesse caso o id
    return res.send({message: "Rota privada", exclusivo: res.locals.auth_data});
});

//Rota teste - POST
router.post('/', (req,res) => {
    return res.send({message: "Hello index raiz - POST"})
});

module.exports = router;