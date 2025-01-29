const express = require('express');
// Importação do body-parser
const bodyParser = require('body-parser');  
const app = express();
const router = express.Router();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Definindo rota diretamente
app.get('/', (req, res, next) => {    
    res.status(200).send({
        title: "Omnigrejas API ",
        version: "0.0.1"
    });
 const create = router.post('/', (req, res, next) => {
    // Retorna o JSON enviado no corpo da requisição 
    res.status(201).send(req.body);
    

});
});

app.use('/', router);

module.exports = app;
