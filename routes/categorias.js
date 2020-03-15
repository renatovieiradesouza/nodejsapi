const express = require('express');
const router = express.Router();

//Model
const Categorias = require('../model/categoria');

//GET Categorias - find all
router.get('/', (req,res) => {
    Categorias.find({}, (err,data) => {
        if(err) return res.send({ error: `Erro na consulta de categorias` });
        return res.send(data);
    });
});

//POST Criação de Categoria
router.post('/create', (req,res)=> {
    //Modelo desestruturado
    const { nome, fotoUrl } = req.body;
    //Validação de envio dos dados necessários
    if(!nome || !fotoUrl) return res.send({ error: `Dados insuficientes para processar sua requisição!` });

    //Faz uma busca pelo nome, afim de verificar se já existe
    Categorias.findOne({nome}, (err,data) => {
        //Valida erro somente
        if(err) return res.send({ error: `Erro ao processar sua requisição` });
        //Valida se já existe no banco
        if(data) return res.send({ error: `Categoria já existe` });
        //Cria a categoria
        Categorias.create(req.body, (err,data) => {
            if(err) return res.send({ error: `Erro ao criar nova categoria` });
            return res.send(data);
        });
    });
});

module.exports = router;