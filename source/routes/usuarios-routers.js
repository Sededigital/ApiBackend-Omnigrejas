const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'User')); // Aqui está o caminho ajustado
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para hashear a senha

// Criar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validação básica
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
  }

  try {
    // Verificar se o e-mail já está em uso
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'E-mail já está em uso.' });
    }

    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o novo usuário
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário.', erro: err.message });
  }
});

module.exports = router;
