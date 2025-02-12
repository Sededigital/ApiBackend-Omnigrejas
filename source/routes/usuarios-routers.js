const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Certifique-se de ter um modelo User

// Criar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário.', erro: err.message });
  }
});

module.exports = router;
