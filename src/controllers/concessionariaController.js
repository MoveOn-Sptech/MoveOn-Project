var rodoviaModel = require("../models/rodoviaModel");

function rodoviaComMaisAcidente(req, res) {

    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    if (dataInicio == undefined || dataFim == undefined || dataInicio == null || dataFim == null || dataInicio === "" || dataFim === "" || dataInicio == 'null' || dataFim == 'null') {
        return rodoviaModel.obterRodoviasComMaisAcidente(req.query.fkConcessionaria)
            .then(
                (resultado) => {
                    res.status(200).json(resultado);
                }
            ).catch(
                (erro) => {
                    console.log(erro);
                    console.log("\nHouve um erro ao buscar as rodovias com mais acidentes! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    rodoviaModel.obterRodoviasComMaisAcidenteComIntervalo(req.query.fkConcessionaria, dataInicio, dataFim)
        .then(
            (resultado) => {
                res.status(200).json(resultado);
            }
        ).catch(
            (erro) => {
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

function acidentePorMes(req, res) {
    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    return rodoviaModel.obterAcidentePorMes(req.query.fkConcessionaria, dataInicio, dataFim)
        .then(
            (resultado) => {
                console.log(resultado);
                res.status(200).json(resultado);
            }
        ).catch(
            (erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os acidentes por mês! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    rodoviaComMaisAcidente,
    gravidadeDasVitimas,
    tipoDePista,
    acidentePorMes
}