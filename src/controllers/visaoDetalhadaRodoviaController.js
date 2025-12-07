var detalhadaModel = require("../models/visaoDetalhadaRodoviaModel");

// Função auxiliar para limpar e somar os tipos de veículos
function tratarDadosVeiculos(listaBruta) {
    let mapaVeiculos = {};

    listaBruta.forEach(item => {
        // Exemplo de string: "AUTOMÓVEL=1|MOTO=1"
        let rawString = item.tipoVeiculo || ""; 
        let qtdAcidentes = item.qtd; // Quantas vezes esse acidente específico ocorreu

        // Separa por pipe "|"
        let categorias = rawString.split('|');

        categorias.forEach(cat => {
            // Separa nome e quantidade (Ex: "AUTOMÓVEL=1" -> ["AUTOMÓVEL", "1"])
            let partes = cat.split('=');
            let nomeVeiculo = partes[0].trim().toUpperCase();
            
            // Se tiver quantidade explícita usa, senão assume 1
            let qtdVeiculosNoAcidente = partes.length > 1 ? parseInt(partes[1]) : 1; 

            // Multiplica: (veículos neste acidente) * (vezes que esse acidente ocorreu)
            let totalGeral = qtdVeiculosNoAcidente * qtdAcidentes;

            // Soma no mapa geral
            if (mapaVeiculos[nomeVeiculo]) {
                mapaVeiculos[nomeVeiculo] += totalGeral;
            } else {
                mapaVeiculos[nomeVeiculo] = totalGeral;
            }
        });
    });

    // Converte o mapa em lista ordenada
    let listaFinal = Object.keys(mapaVeiculos).map(key => ({
        tipoVeiculo: key,
        qtd: mapaVeiculos[key]
    })).sort((a, b) => b.qtd - a.qtd); // Ordena do maior para o menor

    // Pega os Top 5 e agrupa o resto em "OUTROS"
    if (listaFinal.length > 5) {
        let top5 = listaFinal.slice(0, 5);
        let resto = listaFinal.slice(5).reduce((acc, item) => acc + item.qtd, 0);
        
        if (resto > 0) {
            top5.push({ tipoVeiculo: "OUTROS", qtd: resto });
        }
        return top5;
    }

    return listaFinal;
}

function buscarDados(req, res) {
    var idRodovia = req.params.idRodovia;
    var inicio = req.query.inicio;
    var fim = req.query.fim;

    if (idRodovia == undefined) {
        res.status(400).send("ID da rodovia está undefined!");
        return;
    }

    Promise.all([
        detalhadaModel.buscarKpis(idRodovia, inicio, fim),
        detalhadaModel.buscarTiposAcidente(idRodovia, inicio, fim),
        detalhadaModel.buscarClima(idRodovia, inicio, fim),
        detalhadaModel.buscarVeiculos(idRodovia, inicio, fim),
        detalhadaModel.buscarVitimas(idRodovia, inicio, fim),
        detalhadaModel.buscarHorarios(idRodovia, inicio, fim),
        detalhadaModel.buscarKms(idRodovia, inicio, fim),
        detalhadaModel.buscarInfoRodovia(idRodovia)
    ])
    .then(resultados => {
        let veiculosProcessados = tratarDadosVeiculos(resultados[3]);

        var resposta = {
            kpis: resultados[0][0],
            tipos: resultados[1],
            clima: resultados[2],
            veiculos: veiculosProcessados,
            vitimas: resultados[4][0],
            horarios: resultados[5],
            kms: resultados[6],
            info: resultados[7][0]
        };
        res.json(resposta);
    })
    .catch(erro => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDados
};