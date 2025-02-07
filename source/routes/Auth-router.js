"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-controller");


// Rotas do CRUD de autenticação
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/login", controller.postLogin);
router.post("/refresh-token", controller.postRefreshToken);


module.exports = router;



