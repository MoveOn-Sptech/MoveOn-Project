var database = require("../database/config")

function obterRodoviasComMaisAcidente(fkConcessionaria) {
    var instrucaoSql = `
        SELECT 
            r.nomeRodovia,
            SUM(a.vitLeve + a.vitGrave + a.vitFatal) AS quantidade
        FROM Rodovia r
        JOIN Acidente a ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria}
        GROUP BY r.nomeRodovia
        ORDER BY quantidade DESC;
    `;
    return database.executar(instrucaoSql);
}

function obterGravidadeDasVitimas(fkConcessionaria) {
    console.log("FK CONCESSIONARIA MODEL: " + fkConcessionaria)
    var instrucaoSql = `
        SELECT 
            SUM(a.vitLeve) AS quantidadeLeve,
            SUM(a.vitGrave) AS quantidadeGrave,
            SUM(a.vitFatal) AS quantidadeFatal
        FROM Rodovia r
        JOIN Acidente a ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria};
    `;
    return database.executar(instrucaoSql);
}

function obterTipoDePista(fkConcessionaria) {
    var instrucaoSql = `
        SELECT 
            COUNT(a.tipoPista) AS quantidade,
            a.tipoPista
        FROM Acidente a
        JOIN Rodovia r ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria}
        GROUP BY a.tipoPista;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    obterRodoviasComMaisAcidente,
    obterGravidadeDasVitimas,
    obterTipoDePista
};
