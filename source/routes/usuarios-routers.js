"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarios-controllers");

// Rotas do CRUD de usuários
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);



module.exports = router;


