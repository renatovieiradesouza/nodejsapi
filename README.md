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

## Criando rotas
```
//Crie a pasta routes e os arquivos index.js e users.js nessa pasta
//Import o mesmo no app.js
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

//Agora no seu app.js deve ficar assim:
//Require lib express
const express = require('express');
const app = express();

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


//No arquivo de index.js deve ser configurado as rotas, no index será a raiz e no users o endpoint /users, exemplo:
const express = require('express');
const router = express.Router();

//Rota teste - GET
router.get('/', (req,res) => {
return res.send({message: "Hello users raiz - GET"})
});

//Rota teste - POST
router.post('/', (req,res) => {
return res.send({message: "Hello users raiz - POST"})
});

module.exports = router;
```

## Criando uma rota do tipo DELETE

```
//Delete usuario
router.delete('/create', (req,res) => {
    let obj = req.query;
    return res.send({message: `Usuário ${obj.usuario} deletado com sucesso!`})
});
```

## Recebendo parametros URL Query

Para receber esses dados via url, ex: http://localhost:3000?usuario=Renato&idade=32, basta criar um objeto do tipo query com o atributo req do seu endpoint, veja:

```
//Criação de usuario
router.post('/create', (req,res) => {
    let obj = req.query;
    return res.send({message: `Olá, seu usuário foi criado com sucesso: ${obj.usuario}`})
});
```

