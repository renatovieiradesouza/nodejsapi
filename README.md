# nodejsapi

## Need Tools
- Node JS


## Need Packages
- express

## Estrutura básica para iniciar sua API em NODE
```
//Require lib express
const express = require('express');
const app = express();

//Listen port
app.listen(3000);

 //Export module
 module.exports = app;
 ```

## Exemplo de rota básica - GET
**Com Arrow Function ES6**
```
app.get('/', (req,res) => {
    return res.send({message: "Hello World Flatearth"})
})
```
**Sem Arrow function**
```
app.get('/', (req,res) => {
    return res.send({message: "Hello World Flatearth"})
})
```

## Rota com params query na URL
```
//Rota teste - GET com query - parâmentros vindo na URL (/?)
app.get('/', (req,res) => {
    let obj = req.query;
    return res.send({message: `Hello World Flat earth - GET | Seu nome é: ${obj.nome}, sua idade é: ${obj.idade} anos`})
})
```

## Direcionar cada rota para um determinado arquivo, assim trabalhamos isolados, cada rota tem seu arquivo
```
//Instanciando arquivos de rotas
const indexRoute = require('./routes/index');
```

```
//Direcionando as rotas para seus respectivos arquivos
app.user('/', indexRoute);
```

**No arquivo da rota index, fazemos:**

## Criando um model  para API
