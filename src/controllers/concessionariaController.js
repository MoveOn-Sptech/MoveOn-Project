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
    const dataInicio = req.query.dataInicio;
    const dataFim = req.query.dataFim;

    const fkConcessionaria = req.query.fkConcessionaria;
    const nomeConcessionaria = "Concessionária Exemplo"
    const dataAtual = new Intl.DateTimeFormat('pt-BR').format(new Date());
    const responsavel = "Jhon doe"




    const rodoviasComMaisAcidentes = [
        { nome: "Rodovia A", quantidade: 15 },
        { nome: "Rodovia B", quantidade: 10 },
        { nome: "Rodovia C", quantidade: 8 }
    ];


    const gravidadePorVitima = await rodoviaModel.obterGravidadeDasVitimas(fkConcessionaria)
    console.log(gravidadeDasVitimas)

    const tipoPista = await rodoviaModel.obterTipoDePista(fkConcessionaria)
    const totalTipoPista = tipoPista.reduce((acc, curr) => acc + curr.quantidade, 0);



    const dataPassadoInicio = "01/01/2023";
    const dataPassadoFim = "31/12/2023";

    const dataAnoAtual = 25;
    const dataAnoPassado = 30;

    const variacaoPercentual = (((dataAnoAtual - dataAnoPassado) / dataAnoPassado) * 100).toFixed(2);


    const teamplate = `*
Relatório de Acidentes - MoveOn - Concessionária ${nomeConcessionaria}*
_Data: ${dataAtual}_
_Responsável: ${responsavel}_

---

*📊 Rodovias com mais acidentes*
${rodoviasComMaisAcidentes.map(rodovia => `- ${rodovia.nome}: ${rodovia.quantidade} acidentes`).join('\n')}
---

*⚠️ Gravidade por vítima (Gráfico Pizza)*
Leve: ${gravidadeDasVitimas["quantidadeLeve"]}
Grave: ${gravidadeDasVitimas["quantidadeGrave"]}
Fatal: ${gravidadeDasVitimas["quantidadeFatal"]}

---

*🛣️ Tipo de pista (Gráfico Pizza)*
${tipoPista.map(pista => `- ${pista.tipoPista}: ${pista.quantidade} acidentes (${((pista.quantidade / totalTipoPista) * 100).toFixed(2)}%)`).join('\n')}
---

*📈 Comparativo de acidentes (Ano atual vs Ano passado)*
- Ano Atual: Inicio: ${dataInicio} - Fim: ${dataFim} - Total: ${dataAnoAtual}
- Ano Passado: Inicio: ${dataPassadoInicio} - Fim: ${dataPassadoFim} - Total: ${dataAnoPassado}
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