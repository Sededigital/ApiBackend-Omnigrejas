const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota principal
const indexRoutes = require('./routes/index-router');
const usuariosRoutes = require('./routes/usuarios-routers');

// Definindo a rota /create corretamente



app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);


module.exports = app;
