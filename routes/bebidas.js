const express = require('express');
const router = express.Router();

//Model
const Bebidas = require('../model/bebida');

//GET Bebidas - find all
router.get('/', (req,res) => {
    Bebidas.find({}, (err,data) => {
        if(err) return res.send({ error: `Erro na consulta de bebidas` });
        return res.send(data);
    });
});

//POST Criação de Bebida
router.post('/create', (req,res) => {
    //Modelo desestruturado
    const { nome, codigo, qtd, valor, tamanho, foto, categoriaId } = req.body;

    if(!nome || !codigo || !qtd || !valor || !tamanho || !foto || !categoriaId) return res.send({ error: `Dados insuficientes para processar sua requisição!!` });

    Bebidas.findOne({codigo}, (err,data) => {
        //Valida erro
        if (err) return res.send({ error: `Bebida não encontrado!` });
        //Valida se já existe
        if (data) return res.send({ error: `Bebida já existe na base!` });
        //Cria bebida
        Bebidas.create(req.body, (err,data) => {
            if(err) return res.send({ error: `Erro ao criar bebida: ` + err });
            return res.send(data);
        });
    });
});

module.exports = router;