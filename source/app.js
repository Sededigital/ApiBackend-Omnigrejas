const express = require('express');
const app = express();

// Definindo rota diretamente
app.get('/', (req, res) => {    
    res.status(200).send({
        title: "Omnigrejas API ",
        version: "0.0.1"
    });
});

module.exports = app;
