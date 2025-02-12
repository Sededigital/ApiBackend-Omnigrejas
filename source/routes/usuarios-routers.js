const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuário

// Criar usuário
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

// Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter usuários.', erro: err.message });
  }
});

// Obter um usuário pelo ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter usuário.', erro: err.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioAtualizado) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário.', erro: err.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const usuarioDeletado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioDeletado) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário.', erro: err.message });
  }
});

module.exports = router;
