var database = require("../database/config");

function listar(textoPesquisa, filtroQuantidade) {
    var instrucaoSql = `
        SELECT 
            r.idRodovia, 
            r.nome AS nomeRodovia, 
            r.denominacao AS denominacaoRodovia,
            r.municipio AS municipioRodovia,
            r.regionalDer, 
            COUNT(a.idAcidente) AS qtdAcidentes
        FROM 
            Rodovia r
        LEFT JOIN 
            Acidente a ON r.idRodovia = a.fkRodovia
        WHERE 
            dtHoraAcidente >= '2024-12-01 00:00:00'
            AND
            dtHoraAcidente < '2024-12-31 23:59:59'
    `;

    if (textoPesquisa != undefined && textoPesquisa != "") {
        instrucaoSql += ` AND (r.nome LIKE '%${textoPesquisa}%' OR r.denominacao LIKE '%${textoPesquisa}%') `;
    }

    instrucaoSql += `
        GROUP BY 
            r.idRodovia, r.nome, r.denominacao, r.municipio, r.regionalDer
    `;

    if (filtroQuantidade != undefined && filtroQuantidade != "" && filtroQuantidade != "#") {
        var valorFiltro = filtroQuantidade.replace('+', '');
        if (valorFiltro) {
            instrucaoSql += ` HAVING qtdAcidentes >= ${valorFiltro} `;
        }
    }

    instrucaoSql += ` ORDER BY qtdAcidentes DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(idRodovia) {
    var instrucaoSql = `
        SELECT 
            r.denominacao AS denominacaoRodovia,
            c.nome AS nomeConcessionaria,
            r.municipio AS municipioRodovia,
            r.regionalDer
        FROM 
            Rodovia r
        INNER JOIN 
            Concessionaria c ON r.fkConcessionaria = c.idConcessionaria
        WHERE 
            r.idRodovia = ${idRodovia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarPorId
};