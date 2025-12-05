var database = require("../database/config")

function obterRodoviasComMaisAcidente(fkConcessionaria) {
    var instrucaoSql = `
        SELECT 
            r.nome,
            SUM(a.qtdVitLeve + a.qtdVitGrave + a.qtdVitFatal) AS quantidade
        FROM Rodovia r
        JOIN Acidente a ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria}
        GROUP BY r.nome
        ORDER BY quantidade DESC;
    `;
    return database.executar(instrucaoSql);
}

function obterRodoviasComMaisAcidenteComIntervalo(fkConcessionaria, dataInicio, dataFim) {
    var instrucaoSql = `
        SELECT 
            r.nome as nomeRodovia,
            SUM(a.qtdVitLeve + a.qtdVitGrave + a.qtdVitFatal) AS quantidade
        FROM Rodovia r
        JOIN Acidente a ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria} AND a.dtHoraAcidente BETWEEN '${dataInicio}' AND '${dataFim}'
        GROUP BY r.nome
        ORDER BY quantidade DESC;
    `;
    return database.executar(instrucaoSql);
}

function obterGravidadeDasVitimas(fkConcessionaria) {
    console.log("FK CONCESSIONARIA MODEL: " + fkConcessionaria)
    var instrucaoSql = `
        SELECT 
            SUM(a.qtdVitLeve) AS quantidadeLeve,
            SUM(a.qtdVitGrave) AS quantidadeGrave,
            SUM(a.qtdVitFatal) AS quantidadeFatal
        FROM Rodovia r
        JOIN Acidente a ON a.fkRodovia = r.idRodovia
        WHERE r.fkConcessionaria = ${fkConcessionaria};
    `;
    return database.executar(instrucaoSql);
}


function obterAcidentePorMes(fkConcessionaria, dataInicio, dataFim) {
    console.log("FK CONCESSIONARIA MODEL: " + fkConcessionaria)

    var instrucaoSql = `
    select 
        count(Acidente.idAcidente) as quantidade,
        month(Acidente.dtHoraAcidente) as mes
    from Acidente 
    where 
        Acidente.fkRodovia in (select Rodovia.idRodovia from Rodovia where Rodovia.fkConcessionaria = ${fkConcessionaria})
        and 
        Acidente.dtHoraAcidente between '${dataInicio}' and '${dataFim}'
    group by month(Acidente.dtHoraAcidente);`;

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
    obterRodoviasComMaisAcidenteComIntervalo,
    obterGravidadeDasVitimas,
    obterTipoDePista,
    obterAcidentePorMes
};
