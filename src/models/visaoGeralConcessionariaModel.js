var database = require("../database/config")

function concessionarias() {
    var instrucaoSql = `
    WITH AcidentesMesAnterior AS (
    SELECT
        r.fkConcessionaria,
        COUNT(a.idAcidente) AS total_acidentes_mes_anterior
    FROM
        Acidente a
    JOIN
        Rodovia r ON a.fkRodovia = r.idRodovia
    WHERE
        -- Filtra acidentes do mês anterior (assumindo que o "mês atual" para o cálculo é Nov/2024,
        -- então o mês anterior é Out/2024).
        -- Substitua '2024-11-01' pela data de início do "mês atual" que você está usando como referência.
        a.dtHoraAcidente >= '2024-11-01 00:00:00' AND a.dtHoraAcidente < '2024-12-01 00:00:00'
    GROUP BY
        r.fkConcessionaria
),
AcidentesUltimoMes AS (
    SELECT
        r.fkConcessionaria,
        COUNT(a.idAcidente) AS total_acidentes_ultimo_mes
    FROM
        Acidente a
    JOIN
        Rodovia r ON a.fkRodovia = r.idRodovia
    WHERE
        -- Filtra acidentes do último mês (assumindo que o "mês atual" para o cálculo é Nov/2024).
        -- Substitua '2024-11-01' pela data de início do "mês atual" que você está usando como referência.
        a.dtHoraAcidente >= '2024-12-01 00:00:00' AND a.dtHoraAcidente < '2025-01-01 00:00:00'
    GROUP BY
        r.fkConcessionaria
)
SELECT
    c.idConcessionaria,
    c.nome as nomeConcessionaria, 
    COALESCE(ama.total_acidentes_mes_anterior, 0) AS acidentes_mes_anterior,
    COALESCE(aum.total_acidentes_ultimo_mes, 0) AS acidentes_ultimo_mes,
    -- Calcula a porcentagem de aumento/diminuição
    -- Usa CASE para evitar divisão por zero: se o mês anterior não teve acidentes, o aumento é indefinido ou 100% se o mês atual tiver algum.
    CASE
        WHEN COALESCE(ama.total_acidentes_mes_anterior, 0) = 0 THEN
            CASE
                WHEN COALESCE(aum.total_acidentes_ultimo_mes, 0) > 0 THEN 100.0 -- Aumento de 100% (ou mais, se preferir)
                ELSE 0.0 -- Sem acidentes em ambos os meses, 0% de mudança
            END
        ELSE
            ROUND(((COALESCE(aum.total_acidentes_ultimo_mes, 0) - COALESCE(ama.total_acidentes_mes_anterior, 0)) * 100.0 / ama.total_acidentes_mes_anterior), 2)
    END AS porcentagem_aumento
    FROM
    Concessionaria c
LEFT JOIN
    AcidentesMesAnterior ama ON c.idConcessionaria = ama.fkConcessionaria
LEFT JOIN
    AcidentesUltimoMes aum ON c.idConcessionaria = aum.fkConcessionaria
ORDER BY
    porcentagem_aumento DESC; -- Ordena da maior porcentagem de aumento para a menor (ou maior diminuição)
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function municipios(dataInicio, dataFim) {
    var instrucaoSql = `
    SELECT
    R.municipio as municipioRodovia,
    COUNT(A.idAcidente) AS totalAcidentes
FROM
    Acidente AS A
INNER JOIN
    Rodovia AS R ON A.fkRodovia = R.idRodovia
WHERE
    A.dtHoraAcidente >= '${dataInicio} 00:00:00'
    AND A.dtHoraAcidente <= '${dataFim} 23:59:59'
GROUP BY
    R.municipio
ORDER BY
    totalAcidentes DESC
LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function regionalDer(dataInicio, dataFim) {
    var instrucaoSql = `
    SELECT
    R.regionalDer as regionalDer,
    COUNT(A.idAcidente) AS totalAcidentes
FROM
    Acidente AS A
JOIN
    Rodovia AS R ON A.fkRodovia = R.idRodovia
WHERE
    A.dtHoraAcidente >= '${dataInicio} 00:00:00'
    AND A.dtHoraAcidente <= '${dataFim} 23:59:59'
GROUP BY
    regionalDer
ORDER BY
    totalAcidentes DESC
LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function regionalAdm(dataInicio, dataFim) {
    var instrucaoSql = `
    SELECT
    R.regionalAdmSp,
    COUNT(A.idAcidente) AS totalAcidentes
FROM
    Rodovia AS R
JOIN
    Acidente AS A ON R.idRodovia = A.fkRodovia
WHERE
    A.dtHoraAcidente >= '${dataInicio} 00:00:00'
    AND A.dtHoraAcidente <= '${dataFim} 23:59:59'
GROUP BY
    R.regionalAdmSp
ORDER BY
    totalAcidentes DESC
LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    concessionarias,
    municipios,
    regionalDer,
    regionalAdm
};