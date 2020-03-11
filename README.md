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

## Instalar o mongoose para gerenciar mongoDB
**No terminal:** digite: npm install mongoose --save
**No terminal:** digite: npm install body-parser --save




## Para criar um Schema (model) da sua tabela (no-sql), usamos o mongoose, veja um exemplo de como criar a mesma
**crie uma pasta model e dentro da mesma crie o arquivo users.js**

No arquivo coloque:

```
//GET Usuários - find all
router.get('/', (req,res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: `Erro na consulta de usuários` });
        return res.send(data);
    });
});
```

Reparem que após o **find**, temos {}, é para pegar todos os registros, e dentro de find ainda temos **err, data** que serão nossos objetos de retorno, seja em caso
de sucesso como de erro.

## Vamos criar um POST para criar usuários
**no arquivo users.js**

## Desestruturação
Com essa possibilidade, você não precisa ficar chamando obj.nome para tudo, veja:
**Sem desestruturação**
```
const obj = req.body;
if(!obj.email || !obj.password) {
    return res.send({ error: `Dados insuficientes!` });
}
```
**Com Desestruturação**
```
const { email, password } = req.body;
if(!email || !password) {
    return res.send({ error: `Dados insuficientes!` })
}
```

**Reduzindo código com a maestria do JS**
 ```
 Users.findOne({email: email}); //Caso a propriedade e o valor buscado tem os mesmos nomes, como aqui, basta colocar um valor, o JS já resolve pra vc
 ```

## Criando usuario com POST
**Usando apenas o req.body para criar o usuário, mas vc poderia usar -> email: email, password: password, como o que vamos receber é somente email e password, podemos usar o req.body, se viesse mais dados dentrod o body, não seria possível usar req.body e sim email: email, password: password
```
//POST Criação de usuario
router.post('/create', (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: `Dados insuficientes!`});
    
    //Caso a propriedade e o valor buscado tem os mesmos nomes, como aqui, basta colocar um valor, o JS já resolve pra vc
    Users.findOne({email}, (err, data) => {
        //Valida erro
        if (err) return res.send({ error: `E-mail não encontrado!` });
        //Valida se já existe
        if (data) return res.send({ error: `E-mail já existe na base!` });
        //Cria usuário usando apenas o req.body
        Users.create(req.body, (err,data) => {
            if(err) return res.send({ error: `Erro ao criar usuario: ` + err });
            return res.send(data);
        });
    });
});

