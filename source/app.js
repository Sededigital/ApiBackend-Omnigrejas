const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config(); // Carregar variáveis de ambiente

// Inicialização do app
const app = express();

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Atlas conectado com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Middlewares
app.use(cors()); // Habilita CORS para comunicação entre servidores
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
// Rotas
const indexRoutes = require('./routes/index-router');
const usuariosRoutes = require('./routes/usuarios-routers');
const authRoutes = require('./routes/Auth-router'); 

app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

// Exporta o app
module.exports = app;
