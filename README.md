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

