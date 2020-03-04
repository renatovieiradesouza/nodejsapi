//Require lib express
const express = require('express');
const app = express();

//Mongoose
const mongoose = require('mongoose');
//BodyParser
const bodyParser = require('body-parser');
//Url banco
const url = 'mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority';
//Opções padrões para conexão com banco de dados
const options = { poolSize: 5, useUnifiedTopology: true,  useNewUrlParser: true}; //Usando useUnifiedTopology não precisa mais passar os parâmetros de reconexão e retry, td está incorporato no useUnifiedTopology

//Conexão
mongoose.connect(url, options);
//Remove alerta mongoose
mongoose.set('useCreateIndex', true);

//Verifica se houve erro e imprime no console
mongoose.connection.on('error', (err) => {
    console.log(`Erro na conexão com o banco de dados ${err}`);
})

//Verifica se houve desconexão e imprime no console
mongoose.connection.on('disconnected', () => {
    console.log(`Aplicação desconectada do banco de dados`);
})

//Verifica conexão com sucesso
mongoose.connection.on('connected', () => {
    console.log(`Aplicação conectada com sucesso ao banco de dados!`);
})

//Configurando bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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