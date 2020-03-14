const jwt = require('jsonwebtoken');

const token = (req,res, next) => {
    const token_header = req.headers.token;

    //Valida se tem token válido
    if(!token_header) return res.send({ error: `Token não enviado!` });

    jwt.verify(token_header, 'sarah', (err, decoded) => {
        if(err) return res.send({ error: `Token inválido` });
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = token;