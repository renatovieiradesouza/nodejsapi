const express = require('express');
const router = express.Router();

//Rota teste - GET
router.get('/', (req,res) => {
    return res.send({message: "Hello index raiz - GET"})
});

//Rota teste - POST
router.post('/', (req,res) => {
    return res.send({message: "Hello index raiz - POST"})
});

module.exports = router;