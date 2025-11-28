var database = require("../database/config")


function registrar(titulo, mensagem, fkUsuario, fkConcessionaria) {

    var instrucaoSql = `INSERT INTO Notificacao(idNotificacao, dataHoraEmissao, titulo, mensagem, fkUsuario, fkConcessionaria) VALUES (DEFAULT, DEFAULT, '${titulo}', '${mensagem}', ${fkUsuario}, ${fkConcessionaria});`;
    console.log("Executando a instrução SQL de NOTIFICAÇÃO: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    registrar
};