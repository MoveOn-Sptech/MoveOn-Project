var rodoviaModel = require("../models/rodoviaModel");

var slack = require("./utils/slack");

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

async function gerarRelatorio(req, res) {
    const { dataInicio, dataFim, responsavel, concessionaria } = req.query;

    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataFim);

    const diferencaMeses = (dataFimObj.getFullYear() - dataInicioObj.getFullYear()) * 12 + (dataFimObj.getMonth() - dataInicioObj.getMonth());

    const fkConcessionaria = req.query.fkConcessionaria;



    const rodoviasComMaisAcidentes = await rodoviaModel.obterRodoviasComMaisAcidenteComIntervalo(fkConcessionaria, dataInicio, dataFim);
    const totalAcidentes = rodoviasComMaisAcidentes.reduce((acc, curr) => acc + parseInt(curr.quantidade), 0);


    const gravidadePorVitima = (await rodoviaModel.obterGravidadeDasVitimas(fkConcessionaria))[0]
    const totalGravidadePorVitima = parseInt(gravidadePorVitima.quantidadeLeve) + parseInt(gravidadePorVitima.quantidadeGrave) + parseInt(gravidadePorVitima.quantidadeFatal);




    const tipoPista = await rodoviaModel.obterTipoDePista(fkConcessionaria)
    const totalTipoPista = tipoPista.reduce((acc, curr) => acc + curr.quantidade, 0);



    const dataPassadoInicio = dataInicioObj.getDate() + "/" + (dataInicioObj.getMonth() + 1) + "/" + (dataInicioObj.getFullYear() - 1);
    const dataPassadoFim = dataFimObj.getDate() + "/" + (dataFimObj.getMonth() + 1) + "/" + (dataFimObj.getFullYear() - 1);


    const variacaoPercentual = (((totalAcidentes - totalAcidentes) / totalAcidentes) * 100).toFixed(2);

    const teamplate = `*
Relatório de Acidentes - MoveOn - Concessionária ${concessionaria}*
_Data: ${dataInicio} Até ${dataFim} (${diferencaMeses} meses)_
_Responsável: ${responsavel}_

---

*📊 Rodovias com mais acidentes*
${rodoviasComMaisAcidentes.slice(0, 4).map(rodovia => `- ${rodovia.nomeRodovia}: ${rodovia.quantidade} acidentes (${(rodovia.quantidade / totalAcidentes * 100).toFixed(2)}%) `).join('\n')}
---

*⚠️ Gravidade por vítima (Gráfico Pizza)*
Leve: ${gravidadePorVitima["quantidadeLeve"]} (${(gravidadePorVitima["quantidadeLeve"] / totalGravidadePorVitima * 100).toFixed(2)}%)
Grave: ${gravidadePorVitima["quantidadeGrave"]} (${(gravidadePorVitima["quantidadeGrave"] / totalGravidadePorVitima * 100).toFixed(2)}%)
Fatal: ${gravidadePorVitima["quantidadeFatal"]} (${(gravidadePorVitima["quantidadeFatal"] / totalGravidadePorVitima * 100).toFixed(2)}%)

---

*🛣️ Tipo de pista (Gráfico Pizza)*
${tipoPista.map(pista => `- ${pista.tipoPista}: ${pista.quantidade} acidentes (${((pista.quantidade / totalTipoPista) * 100).toFixed(2)}%)`).join('\n')}
---

*📈 Comparativo de acidentes (Ano atual vs Ano passado)*
- Ano Atual: Inicio: ${dataInicio} - Fim: ${dataFim} - Total: ${totalAcidentes}
- Ano Passado: Inicio: ${dataPassadoInicio} - Fim: ${dataPassadoFim} - Total: ${totalAcidentes}
- Variação: ${variacaoPercentual}%

---

*Observações adicionais:*
- Nenhuma observação adicional. 
---

_Enviado por MoveOn_
    `


    console.log(`Gerando relatório para a concessionária de ID: ${fkConcessionaria}`);

    console.log(teamplate);


    const email = req.query.email;
    console.log(`Enviando relatório para o email: ${email}`);
    slack.sendDirectMessage(email, teamplate);

    res.status(200).json({ message: "Relatório gerado com sucesso!" });
}

module.exports = {
    rodoviaComMaisAcidente,
    gravidadeDasVitimas,
    tipoDePista,
    acidentePorMes,
    gerarRelatorio
}