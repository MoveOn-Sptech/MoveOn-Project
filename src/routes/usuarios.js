var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/deletar", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

router.post("/listarUsuarios", function (req, res) {
    usuarioController.listarUsuarios(req, res);
});

router.post("/listarRodovias", function (req, res) {
    usuarioController.listarRodovias(req, res);
});

router.post("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.post("/editarUsuarioUnico", function (req, res) {
    usuarioController.editarUsuarioUnico(req,res);
});

router.post("/editarRodovia", function (req, res) {
    usuarioController.editarRodovia(req,res);
});

module.exports = router;