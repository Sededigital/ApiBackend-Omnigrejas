const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota principal
app.get('/', (req, res, next) => {    
    res.status(200).send({
        title: "Omnigrejas API",
        version: "0.0.1"
    });
});

// Definindo a rota /create corretamente
const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

// rota para atualização de dados
const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
    id: id,
    item: req.body
});

});



app.use('/', router);
app.use('/clientes', create);
app.use('/clientes', put);

module.exports = app;
