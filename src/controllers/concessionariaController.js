var rodoviaModel = require("../models/rodoviaModel");

function rodoviaComMaisAcidente(req, res) {

    rodoviaModel.obterRodoviasComMaisAcidente(req.query.fkConcessionaria)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as rodovias com mais acidentes! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function gravidadeDasVitimas(req, res) {

    console.log("fkConcessionaria CONTROLLER" + req.query.fkConcessionaria)
    rodoviaModel.obterGravidadeDasVitimas(req.query.fkConcessionaria)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar a gravidade das vitimas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function tipoDePista(req, res) {
    rodoviaModel.obterTipoDePista(req.query.fkConcessionaria)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o tipo de pista! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    rodoviaComMaisAcidente,
    gravidadeDasVitimas,
    tipoDePista
}