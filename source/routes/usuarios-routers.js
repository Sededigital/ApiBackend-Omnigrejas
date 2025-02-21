const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validarDados = require('../middlewares/validarUsuario');

// Definir o esquema de usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('UserModel', userSchema, 'usermodels');

// Rota de teste
router.get('/teste', (req, res) => {
  res.status(200).json({ mensagem: 'Rota GET /usuarios/teste funcionando!' });
});

// Rota para buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await UserModel.find(); // Busca todos os usuários no banco de dados
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: err.message });
  }
});

// Rota para criar um novo usuário
router.post('/', validarDados, async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    const usuarioExistente = await UserModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'E-mail já está em uso.' });
    }

    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o novo usuário
    const novoUsuario = new UserModel({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário.', erro: err.message });
  }
});

module.exports = router;
