"use strict";

const express = require("express");
const router = express.Router();

// Rota para criação de dados
router.post("/", (req, res, next) => {
    res.status(201).send(req.body);
   message : "Usuário cadastrado com sucesso!"

});

// Rota para atualização de dados
router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body,
        message: `O Usuário com id ${id}  foi atualizado com sucesso!`
    });
});

// Rota para exclusão de dados
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        message: ` O Usuário com id ${id} foi excluído com sucesso!`
    });
});

module.exports = router;


