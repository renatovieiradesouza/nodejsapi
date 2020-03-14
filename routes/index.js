const express = require('express');
const router = express.Router();
const token = require('../middlewares/auth');

//Rota teste - GET
router.get('/', token, (req,res) => {
    return res.send({message: "Rota privada"})
});

//Rota teste - POST
router.post('/', (req,res) => {
    return res.send({message: "Hello index raiz - POST"})
});

module.exports = router;