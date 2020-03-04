//Require lib express
const express = require('express');
const app = express();

//Instanciando arquivos de rotas
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

//Direcionando as rotas para seus respectivos arquivos
app.use('/', indexRoute);
app.use('/users', usersRoute);

//Listen port
app.listen(3000);

 //Export module
 module.exports = app;