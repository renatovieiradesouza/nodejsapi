//Require lib express
const express = require('express');
const app = express();

//Instanciando mongoose - modelagem banco mongo
const mongoose = require('mongoose');
//Instanciando body-parser - trabalha com body nas requisições
const bodyParser = require('body-parser');

//Dados conexão Mongo
const url = 'mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority'

//Options default do banco
const options = { poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true };

//Conexão Mongo
mongoose.connect(url,options);
mongoose.set('useCreateIndex', true);

//Tratamento de exceções do banco
mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ', + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados.');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada com sucesso!');
})

//Body Parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Import rotas
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

//Associar rota ao app
app.use('/', indexRoute);
app.use('/users', usersRoute);

//Listen port
app.listen(3000);

 //Export module
 module.exports = app;


 //mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority