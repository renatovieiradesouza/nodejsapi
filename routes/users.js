const express = require('express');
const router = express.Router();
let validaEmail = require('email-validator');

//Model
const Users = require('../model/user');

//GET Usuários - find all
router.get('/', (req,res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: `Erro na consulta de usuários` });
        return res.send(data);
    });
});

//POST Criação de usuario
router.post('/create', (req,res) => {
    //Modelo desestruturado
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: `Dados insuficientes para processar sua requisição!!`});
    
    //Valida e-mail
    if(!validaEmail.validate(email)) return res.send({ erro: `E-mail inválido!` });
    
    //Caso a propriedade e o valor buscado tem os mesmos nomes, como aqui, basta colocar um valor, o JS já resolve pra vc
    Users.findOne({email}, (err, data) => {
        //Valida erro
        if (err) return res.send({ error: `Erro ao processar sua requisição!` });
        //Valida se já existe
        if (data) return res.send({ error: `E-mail já existe na base!` });
        //Cria usuário usando apenas o req.body, mas vc poderia usar email: email, password: password, como o que vamos receber é somente email e password, podemos usar o req.body
        Users.create(req.body, (err,data) => {
            if(err) return res.send({ error: `Erro ao criar usuario: ` + err });
            data.password = undefined; //Remove a senha do retorno para o cliente
            return res.send(data);
        });
    });
});

module.exports = router;