const jwt = require('jsonwebtoken');
const config = require('../config/config')

const token = (req,res, next) => {
    const token_header = req.headers.token;

    //Valida se tem token válido
    if(!token_header) return res.status(401).send({ error: `Token não enviado!` });

    jwt.verify(token_header, config.passwd_json, (err, decoded) => {
        if(err) return res.status(401).send({ error: `Token inválido` });
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = token;