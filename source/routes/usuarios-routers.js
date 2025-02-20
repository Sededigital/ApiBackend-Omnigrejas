const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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

// Alterar o nome do modelo para evitar conflito
const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
  }

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
