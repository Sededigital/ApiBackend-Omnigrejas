const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validarUsuario = require('../middlewares/validarUsuario'); // Middleware de validação

const router = express.Router();

// Definição do schema do usuário
const usuarioSchema = new mongoose.Schema({
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

const UsuarioModel = mongoose.models.UsuarioModel || mongoose.model('UsuarioModel', usuarioSchema);

// Rota para cadastro de usuário
router.post('/signup', validarUsuario, async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await UsuarioModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'E-mail já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new UsuarioModel({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.', erro: err.message });
  }
});

// Rota para login de usuário
router.post('/login', validarUsuario, async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro: err.message });
  }
});

module.exports = router;
