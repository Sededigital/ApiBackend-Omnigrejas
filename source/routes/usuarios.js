"use strict";

const express = require("express");
const router = express.Router(); 

 const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body); 
}); 


const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body,
        message: `Item com ID ${id} foi atualizado com sucesso!`    
    });
});

// Rota para exclusão de dados
const del = router.delete('/:id', (req, res, next) => { 
    const id = req.params.id;
    res.status(200).send({
        message: `Item com ID ${id} foi excluído com sucesso!`
    });
});

module.exports = router;
