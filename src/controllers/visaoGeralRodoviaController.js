var visaoGeralRodoviaModel = require("../models/visaoGeralRodoviaModel");

function listar(req, res) {
    // Captura os parâmetros vindos da URL (?pesquisa=X&filtro=Y)
    var textoPesquisa = req.query.pesquisa;
    var filtroQuantidade = req.query.filtro;

    console.log(`Controller chamando Model com -> Pesquisa: ${textoPesquisa}, Filtro: ${filtroQuantidade}`);

    visaoGeralRodoviaModel.listar(textoPesquisa, filtroQuantidade)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var idRodovia = req.params.idRodovia;

    visaoGeralRodoviaModel.buscarPorId(idRodovia)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar detalhes! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarPorId
};