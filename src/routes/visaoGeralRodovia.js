var express = require("express");
var router = express.Router();

var visaoGeralRodoviaController = require("../controllers/visaoGeralRodoviaController");

router.get("/listar", function (req, res) {
    visaoGeralRodoviaController.listar(req, res);
});

router.get("/buscar/:idRodovia", function (req, res) {
    visaoGeralRodoviaController.buscarPorId(req, res);
});

module.exports = router;