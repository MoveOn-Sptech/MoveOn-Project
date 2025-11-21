var express = require("express");
var router = express.Router();

var concessionariaController = require("../controllers/concessionariaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/rodoviaComMaisAcidente", function (req, res) {
    concessionariaController.rodoviaComMaisAcidente(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/acidentePorMes", function (req, res) {
    concessionariaController.acidentePorMes(req, res);
})



router.get("/gravidadeDasVitimas", function (req, res) {
    concessionariaController.gravidadeDasVitimas(req, res);
});

router.get("/tipoDePista", function (req, res) {
    concessionariaController.tipoDePista(req, res);
})


module.exports = router;