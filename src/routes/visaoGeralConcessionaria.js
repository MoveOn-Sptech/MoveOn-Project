var express = require("express");
var router = express.Router();

var visaoGeralConcessionariaController = require("../controllers/visaoGeralConcessionariaController");

router.post("/concessionarias", function (req, res) {
    visaoGeralConcessionariaController.concessionarias(req, res);
});

router.post("/municipios", function (req, res) {
    visaoGeralConcessionariaController.municipios(req, res);
});

router.post("/regionalDer", function (req, res) {
    visaoGeralConcessionariaController.regionalDer(req, res);
});

router.post("/regionalAdm", function (req, res) {
    visaoGeralConcessionariaController.regionalAdm(req, res);
});

module.exports = router;