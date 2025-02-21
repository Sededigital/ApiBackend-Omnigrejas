const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/auth-model');
const validarUsuario = require('../middlewares/validarUsuario'); // Ajustado para o middleware que você usa

const router = express.Router();

// Rota para cadastro de usuário
router.post('/signup', validarUsuario, async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await UserModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'E-mail já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new UserModel({ nome, email, senha: senhaHash });
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
    const usuario = await UserModel.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // Criar um token JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro: err.message });
  }
});

module.exports = router;
