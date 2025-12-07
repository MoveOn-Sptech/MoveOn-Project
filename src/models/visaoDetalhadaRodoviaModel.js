var database = require("../database/config");

function montarFiltroData(inicio, fim) {
    if (inicio && fim) {
        return `AND dtHoraAcidente BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'`;
    }
    return "";
}

function buscarKpis(idRodovia, inicio, fim) {
    // ATUALIZADO: qtdVitFatal, qtdVitGrave
    var query = `
        SELECT 
            COUNT(idAcidente) as totalAcidentes,
            SUM(qtdVitFatal) as totalObitos,
            (SUM(qtdVitGrave) + SUM(qtdVitFatal)) as totalGravesFatais
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)};
    `;
    return database.executar(query);
}

function buscarTiposAcidente(idRodovia, inicio, fim) {
    var query = `
        SELECT tipoAcidente, COUNT(*) as qtd
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)}
        GROUP BY tipoAcidente
        ORDER BY qtd DESC
        LIMIT 4;
    `;
    return database.executar(query);
}

function buscarClima(idRodovia, inicio, fim) {
    var query = `
        SELECT clima as condicaoMeteorologica, COUNT(*) as qtd
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)}
        GROUP BY clima;
    `;
    return database.executar(query);
}

function buscarVeiculos(idRodovia, inicio, fim) {
    var query = `
        SELECT veiculosEnvolvidos as tipoVeiculo, COUNT(*) as qtd
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)}
        GROUP BY veiculosEnvolvidos;
    `;
    return database.executar(query);
}

function buscarVitimas(idRodovia, inicio, fim) {
    // ATUALIZADO: qtdVitLeve, qtdVitGrave, qtdVitFatal
    var query = `
        SELECT 
            SUM(qtdVitLeve) as leve,
            SUM(qtdVitGrave) as grave,
            SUM(qtdVitFatal) as fatal
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)};
    `;
    return database.executar(query);
}

function buscarHorarios(idRodovia, inicio, fim) {
    var query = `
        SELECT 
            CASE 
                WHEN HOUR(dtHoraAcidente) >= 6 AND HOUR(dtHoraAcidente) < 12 THEN 'Manhã'
                WHEN HOUR(dtHoraAcidente) >= 12 AND HOUR(dtHoraAcidente) < 18 THEN 'Tarde'
                ELSE 'Noite'
            END as periodo,
            COUNT(*) as qtd
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)}
        GROUP BY periodo;
    `;
    return database.executar(query);
}

function buscarKms(idRodovia, inicio, fim) {
    var query = `
        SELECT 
            CASE 
                WHEN marcoKm <= 50 THEN 'Km 0-50'
                WHEN marcoKm > 50 AND marcoKm <= 100 THEN 'Km 51-100'
                WHEN marcoKm > 100 AND marcoKm <= 150 THEN 'Km 101-150'
                ELSE 'Km 150+'
            END as faixaKm,
            COUNT(*) as qtd
        FROM Acidente
        WHERE fkRodovia = ${idRodovia} ${montarFiltroData(inicio, fim)}
        GROUP BY faixaKm
        ORDER BY MIN(marcoKm);
    `;
    return database.executar(query);
}

function buscarInfoRodovia(idRodovia) {
    // ATUALIZADO: r.nome, r.denominacao, c.nome, r.municipio com ALIAS para manter frontend funcionando
    var query = `
        SELECT 
            r.nome AS nomeRodovia, 
            r.denominacao AS denominacaoRodovia, 
            c.nome AS nomeConcessionaria, 
            r.municipio AS municipioRodovia, 
            r.regionalDer
        FROM Rodovia r
        JOIN Concessionaria c ON r.fkConcessionaria = c.idConcessionaria
        WHERE idRodovia = ${idRodovia};
    `;
    return database.executar(query);
}

module.exports = {
    buscarKpis,
    buscarTiposAcidente,
    buscarClima,
    buscarVeiculos,
    buscarVitimas,
    buscarHorarios,
    buscarKms,
    buscarInfoRodovia
};