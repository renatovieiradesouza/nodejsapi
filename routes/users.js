const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../middlewares/auth');
let validaEmail = require('email-validator');

//Funcoes auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, 'sarah', { expiresIn: '7d'});
}

//Model
const Users = require('../model/user');

//GET Usuários - find all
//Usando async await para garantir retorno
router.get('/', token,  async (req,res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: `Erro na consula de usuário` });
    }
});

router.post('/create', token, async (req,res) => {
    //Modelo desestruturado
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: `Dados insuficientes para processar sua requisição!`});
    
    //Valida e-mail
    if(!validaEmail.validate(email)) return res.send({ erro: `E-mail inválido!` });
    
    try {

        if(await Users.findOne({ email })) return res.send({ error: `Usuário já existe` });
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    } catch (err) {
        if (err) return res.send({ error: `Erro ao processar sua requisição!` });
    }
});

router.post('/auth', token, async (req,res) => {
    //Modelo desestruturado
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: `Dados insuficientes para processar sua requisição!` });

    //Valida e-mail
    if(!validaEmail.validate(email)) return res.send({ erro: `E-mail inválido!` });

    try {

        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.send({ error: `Usuário não registrado` });

        const pass_ok = await bcrypt.compare(password,user.password);
        //Login inválido
        if(!pass_ok) return res.send({ error:  `Erro ao processar sua requisição!` });
        //Login válido
        user.password = undefined;
        return res.send({ email: email, fotoUrl: "http://url.google.com.br/firebase", uid: "11454587474w74ww4e7d",  token: createUserToken(user.id)});

    } catch (err) {
        if(err) return res.send({ error: `Erro ao processar sua requisição!` });
    }
});

module.exports = router;