var rodoviaModel = require("../models/rodoviaModel");
var notificacaoModel = require("../models/notificacaoModel");
var usuarioModel = require("../models/usuarioModel");


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

    // DATA DO ANO PASSADO yyyy-mm-dd

    const dataInicioAnoPassado = new Date(dataInicioObj.getFullYear() - 1, dataInicioObj.getMonth(), dataInicioObj.getDate());
    const dataFimAnoPassado = new Date(dataFimObj.getFullYear() - 1, dataFimObj.getMonth(), dataFimObj.getDate());

    const dataInicioAnoPassadoStr = `${dataInicioAnoPassado.getFullYear()}-${String(dataInicioAnoPassado.getMonth() + 1).padStart(2, '0')}-${String(dataInicioAnoPassado.getDate()).padStart(2, '0')}`;
    const dataFimAnoPassadoStr = `${dataFimAnoPassado.getFullYear()}-${String(dataFimAnoPassado.getMonth() + 1).padStart(2, '0')}-${String(dataFimAnoPassado.getDate()).padStart(2, '0')}`;

    const rodoviasComMaisAcidentesDoAnoPassado = await rodoviaModel.obterRodoviasComMaisAcidenteComIntervalo(fkConcessionaria, dataInicioAnoPassadoStr, dataFimAnoPassadoStr);
    const totalAcidentesDoAnoPassado = rodoviasComMaisAcidentesDoAnoPassado.reduce((acc, curr) => acc + parseInt(curr.quantidade), 0);

    console.log({
        totalAcidentes,
        totalAcidentesDoAnoPassado
    })

    const gravidadePorVitima = (await rodoviaModel.obterGravidadeDasVitimas(fkConcessionaria))[0]
    const totalGravidadePorVitima = parseInt(gravidadePorVitima.quantidadeLeve) + parseInt(gravidadePorVitima.quantidadeGrave) + parseInt(gravidadePorVitima.quantidadeFatal);




    const tipoPista = await rodoviaModel.obterTipoDePista(fkConcessionaria)
    const totalTipoPista = tipoPista.reduce((acc, curr) => acc + curr.quantidade, 0);


    const variacaoPercentual = (((totalAcidentes / totalAcidentesDoAnoPassado) * 100) - 100.00).toFixed(2);

    const titulo = `Relatório de Acidentes - MoveOn - Concessionária ${concessionaria}`;
    const teamplate = `*${titulo}*
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
- Ano Atual: Inicio: ${Intl.DateTimeFormat('pt-BR').format(dataInicioObj)} - Fim: ${Intl.DateTimeFormat('pt-BR').format(dataFimObj)} - Total: ${totalAcidentes}
- Ano Passado: Inicio: ${Intl.DateTimeFormat('pt-BR').format(new Date(dataInicioAnoPassado))} - Fim: ${Intl.DateTimeFormat('pt-BR').format(new Date(dataFimAnoPassado))} - Total: ${totalAcidentesDoAnoPassado}
- Variação: ${variacaoPercentual > 0 ? 'Aumento de' : 'Diminuição de'} ${variacaoPercentual}% compara ao ano passado.

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
    notificacaoModel.registrar(
        titulo,
        teamplate,
        req.query.fkUsuario,
        fkConcessionaria
    );
    usuarioModel.registrarLog(`Relatório gerado pela concessionária ${concessionaria} pelo usuário ${responsavel}`);

    res.status(200).json({ message: "Relatório gerado com sucesso!" });
}

module.exports = {
    rodoviaComMaisAcidente,
    gravidadeDasVitimas,
    tipoDePista,
    acidentePorMes,
    gerarRelatorio
}