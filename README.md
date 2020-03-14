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
**crie uma pasta model e dentro da mesma crie o arquivo user.js**

No arquivo coloque:

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
```

Reparem que após o **find**, temos {}, é para pegar todos os registros, e dentro de find ainda temos **err, data** que serão nossos objetos de retorno, seja em caso
de sucesso como de erro.

## Desestruturação
Com essa possibilidade, você não precisa ficar chamando obj.nome para tudo, veja:
**Sem desestruturação**
```
const obj = req.body;
if(!obj.email || !obj.password) {
    return res.send({ error: `Dados insuficientes para processar sua requisição!!` });
}
```

**Com Desestruturação**

```
const { email, password } = req.body;
if(!email || !password) {
    return res.send({ error: `Dados insuficientes para processar sua requisição!!` })
}
```

**Reduzindo código com a maestria do JS**

 ```
 Users.findOne({email: email}); 
 
 //Caso a propriedade e o valor buscado tem os mesmos nomes, como aqui, basta colocar um valor, o JS já resolve pra vc

 Users.findOne({email});
 ```


## Vamos criar um POST para criar usuários
**no arquivo users.js**

**Usando apenas o req.body para criar o usuário, mas vc poderia usar -> email: email, password: password, como o que vamos receber é somente email e password, podemos usar o req.body, se viesse mais dados dentrod o body, não seria possível usar req.body e sim email: email, password: password
```
//POST Criação de usuario
router.post('/create', (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: `Dados insuficientes para processar sua requisição!!`});
    
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
```
## Processo para criar uma API básica

**Configurar sua rota**

Considerando que app.js seja chamado, vamos precisar no minimo ter isso nele:

```
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
const usersRoute = require('./routes/users');

//Associar rota ao app
app.use('/', userRoute);

//Listen port
app.listen(3000);

 //Export module
 module.exports = app;
```

**Criar um Model**

Temos a rota User configurada em app.js, agora vamos ao Model da mesma:

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
```

**Criar uma Rota**

Vamos agora definir o que será feito na rota User, sendo que iremos ter aqui apenas um GET e um POST

```
const express = require('express');
const router = express.Router();

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
```

## Configurando bcrypt para criptografar campo password

Antes de qualquer coisa, instale a lib no seu projeto:
npm install bcrypt --save

Importe a lib no seu arquivo da rota de Users:

```
const bcrypt = require('bcrypt');

//Vamos configurar um evento pré save, que ocorre antes do user ser criado, vejamos:
UserSchema.pre('save', function (next) { 
    let user = this;
    //Valida se teve modificação no campo password, caso não ele continua sem encriptar
    if(!user.isModified('password')) return next();
    //Se passar, ele vai usar o bcrypt
    bcrypt.hash(user.password, 10, (err,encrypted) => {
        user.password = encrypted;
        return next();
    })
});
```

Isso já o suficiente para encriptar sua senha com bcrypt

## Autenticar usuário (POST) com Bcrypt


No Model nós precisamos configurar o evento  pre save para encriptar a senha antes da mesma
ser salva, veja como fica nosso Model de User:

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

//Pre save para encriptar senha
//Não use função de seta (arrow function) nesse caso, pois o this trabalha de maneira de diferente e não deria certo para esse objetivo
UserSchema.pre('save', async function (next) { 
    let user = this;
    //Valida se teve modificação no campo password, caso não ele continua sem encriptar
    if(!user.isModified('password')) return next();

    //Se passar, ele vai usar o bcrypt
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);
```

**Precisamos autenticar com a senha alterada, vamos criar o método endpoint AUTH)**

Basicamente precisamos comparar a a senshaa recebida com a senha no banco, algo como:
```
bcrypt.compare(password,user.password);
```

Nosso Método completo de  auth na rota User:

```
router.post('/auth', async (req,res) => {
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
        return res.send({ email: email, sessaoLogin: "45541005ds05w540450450sd4s50", fotoUrl: "http://url.google.com.br/firebase", uid: "11454587474w74ww4e7d"});

    } catch (err) {
        if(err) return res.send({ error: `Erro ao processar sua requisição!` });
    }
});
```


## Adicionando autenticação JWT

Vamos adiciconar a lib jsonwebtoken, então instale: npm i jsonwebtoken --save

Basicamente você precisa configurar uma função para fazer a autentição JWT, vejamos abaixo:

Antes importe a lib:

```
const jwt = require('jsonwebtoken);
```

Vamos a função:

```
//Funcoes auxiliares
const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, 'senha_autenticacao', { expiresIn: '7d'});
}
```

Após importar e criar a função, você pode criar seus tokens JWT, vamos escolher o endpoint '/create', vejamos:

Apenas adicione o novo atributo token, poderia ser qualquer coisa e chame a funçao usando como parâmetro o ID do usuário, vejamos:

```
return res.send({user, token: createUserToken(user.id)});
```

O retorno seria algo como:

```
{
    "user": {
        "_id": "5e6d234271607938c0405f45",
        "email": "testando123@ig.com.br",
        "created": "2020-03-14T18:32:34.943Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNmQyMzQyNzE2MDc5MzhjMDQwNWY0NSIsImlhdCI6MTU4NDIxMDc1NSwiZXhwIjoxNTg0ODE1NTU1fQ.cEXI4YpZjUfuPlLTEjPQJv0Qnv2a486qu5XgJs3pvC4"
}
```

## Como validar esse token nas minhas requisições

Vamos criar uma pasta na raiz, chamada middlewares e dentro dela o arquivo auth.js, nesse arquivo, vamos adicionar:

```
const jwt = require('jsonwebtoken');

const token = (req,res, next) => {
    //Valida que será necessário vir um header chamado token
    const token_header = req.headers.token;

    //Valida se tem token válido na request
    if(!token_header) return res.send({ error: `Token não enviado!` });

    //Caso seja válido, decodifica o token com a senha e valida
    jwt.verify(token_header, 'senha_autenticacao', (err, decoded) => {
        if(err) return res.send({ error: `Token inválido` });
        //Retorna os dados de quem gerou o token, nesse caso o id
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = token;
```

Importe esse arquivo na rota Users e vamos adicionar a validação de token no endpoint auth, vejamos:
Repare que apenas adicionei a palavra **token**, nesse caso a constante que usamos para importar o middleware: 

```
//Repare no nome da constante
const token = require('../middlewares/auth');
```

```
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
```


## Como adicionar statusCode a suas respostas

Simples, vejamos:
Nos seus retornos, adicione statu(code)
```
 return res.status(201).send({user, token: createUserToken(user.id)});
```

