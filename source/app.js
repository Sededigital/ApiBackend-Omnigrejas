const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

// Inicialização do app
const app = express();

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🔥 MongoDB Atlas conectado com sucesso!"))
.catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
const indexRoutes = require('./routes/index-router');
const usuariosRoutes = require('./routes/usuarios-routers');
const authRoutes = require('../source/routes/Auth-router');

app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

// Exporta o app
module.exports = app;
