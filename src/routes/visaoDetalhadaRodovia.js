var express = require("express");
var router = express.Router();

var controller = require("../controllers/visaoDetalhadaRodoviaController.js");

router.get("/dados/:idRodovia", function (req, res) {
    controller.buscarDados(req, res);
});

module.exports = router;