const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


require("dotenv").config();




// Conexão com o banco de dados


mongoose.connect("mongodb://localhost:27017/OmnigrejasApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🔥 MongoDB conectado com sucesso!"))
.catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));




const app = express();
const router = express.Router();
app.use(cors());
// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rota principal
const indexRoutes = require('./routes/index-router');
const usuariosRoutes = require('./routes/usuarios-routers');

const authRoutes = require("../source/routes/Auth-router");


// Definindo a rota /create corretamente


//usando as rotas
app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use("/api/auth", authRoutes);



module.exports = app;
