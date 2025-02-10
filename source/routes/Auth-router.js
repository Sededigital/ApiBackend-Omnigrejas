const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 


const router = express.Router();

// Endpoint de Registro (Cadastro)
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Criando usuário
    const newUser = new User({ nome, email, senha: hashedSenha });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

// Endpoint de Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email, nome: user.nome } });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
