var visaoGeralConcessionariaModel = require("../models/visaoGeralConcessionariaModel");

function concessionarias(req, res) {

    var vetorNome = [];
    var vetorPorcentagem = [];
    var vetorId = [];

    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    console.log(dataInicio, dataFim);

    visaoGeralConcessionariaModel.concessionarias(dataFim)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Erro na consulta" });
                } else {

                    for (let i = 0; i < resultadoAutenticar.length; i++) {
                        vetorId[i] = resultadoAutenticar[i].idConcessionaria;
                        vetorNome[i] = resultadoAutenticar[i].nomeConcessionaria;
                        vetorPorcentagem[i] = parseFloat(resultadoAutenticar[i].porcentagem_aumento);
                    }

                    res.status(200).json(
                        {
                            idConcessionaria: vetorId,
                            nomeConcessionaria: vetorNome,
                            porcentagemDeAumento: vetorPorcentagem
                        }
                    );
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function municipios(req, res) {

    var municipio = ["", "", "", "", "", "", "", "", "", ""];
    var qtdAcidentes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    console.log(dataInicio, dataFim);

    visaoGeralConcessionariaModel.municipios(dataInicio, dataFim)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Erro na consulta" });
                } else {
                    for (let i = 0; i < 10; i++) {
                        municipio[i] = resultadoAutenticar[i].municipioRodovia;
                        qtdAcidentes[i] = resultadoAutenticar[i].totalAcidentes;
                    }

                    res.status(200).json(
                        {
                            nomeMunicipios: municipio,
                            acidentesMunicipio: qtdAcidentes
                        }
                    );
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function regionalDer(req, res) {

    var regionalDer = ["", "", "", "", "", "", "", "", "", ""];
    var qtdAcidentes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    console.log(dataInicio, dataFim);

    visaoGeralConcessionariaModel.regionalDer(dataInicio, dataFim)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Erro na consulta" });
                } else {

                    for (let i = 0; i < 10; i++) {
                        regionalDer[i] = resultadoAutenticar[i].regionalDer;
                        qtdAcidentes[i] = resultadoAutenticar[i].totalAcidentes;
                    }

                    res.status(200).json(
                        {
                            nomeRegionalDer: regionalDer,
                            acidentesRegionalDer: qtdAcidentes
                        }
                    );
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function regionalAdm(req, res) {

    var regionalAdm = ["", "", "", "", "", "", "", "", "", ""];
    var qtdAcidentes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    console.log(dataInicio, dataFim);

    visaoGeralConcessionariaModel.regionalAdm(dataInicio, dataFim)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Erro na consulta" });
                } else {

                    for (let i = 0; i < 10; i++) {
                        regionalAdm[i] = resultadoAutenticar[i].regionalAdmSp;
                        qtdAcidentes[i] = resultadoAutenticar[i].totalAcidentes;
                    }

                    res.status(200).json(
                        {
                            nomeRegionalAdm: regionalAdm,
                            acidentesRegionalAdm: qtdAcidentes
                        }
                    );
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    municipios,
    regionalDer,
    regionalAdm,
    concessionarias
}