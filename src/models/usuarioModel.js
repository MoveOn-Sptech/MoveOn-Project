var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, cargo FROM Usuario WHERE email = '${email}' AND senha = SHA2('${senha}', 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idUsuario, email, nome) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    let campos = [];

    if (email) {
        campos.push(`email = '${email}'`);
    }

    if (nome) {
        campos.push(`nome = '${nome}'`);
    }

    // Se nenhum campo foi enviado, não faz nada
    if (campos.length === 0) {
        console.log("Nenhum dado para atualizar.");
        return;
    }

    // Montar o SQL dinamicamente
    const instrucaoSql = `
        UPDATE Usuario
        SET ${campos.join(", ")}
        WHERE idUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarUsuarioUnico(id, email, cargo) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var camposUsuario = [];

    if (email) {
        camposUsuario.push(`email = '${email}'`);
    }

    if (cargo) {
        camposUsuario.push(`cargo = '${cargo}'`);
    }

    // Se nenhum campo foi enviado, não faz nada
    if (camposUsuario.length === 0) {
        console.log("Nenhum dado para atualizar.");
        return;
    }

    // Montar o SQL dinamicamente
    const instrucaoSql = `
        UPDATE Usuario
        SET ${camposUsuario.join(", ")}
        WHERE idUsuario = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarRodovia(idRodovia, valorDenominacao, valorRegionalAdm, valorRegionalDer, fkConcessionariaAtual) {
    var camposRodovia = [];

    if (valorDenominacao) {
        camposRodovia.push(`denominacao = '${valorDenominacao}'`);
    }

    if (valorRegionalAdm) {
        camposRodovia.push(`regionalAdmSp = '${valorRegionalAdm}'`);
    }

    if (valorRegionalDer) {
        camposRodovia.push(`regionalDer = '${valorRegionalDer}'`);
    }

    // Se o usuário informar uma FK nova, atualiza
    // if (fkConcessionariaNova) {
    //     camposRodovia.push(`fkConcessionaria = ${fkConcessionariaNova}`);
    // }

    if (camposRodovia.length === 0) {
        console.log("Nenhum dado para atualizar.");
        return;
    }

    // ⚠️ WHERE usa a FK atual, não a nova
    const instrucaoSql = `
        UPDATE Rodovia 
        SET ${camposRodovia.join(", ")}
        WHERE idRodovia = ${idRodovia}
        AND fkConcessionaria = ${fkConcessionariaAtual};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    var instrucaoSql = `
        DELETE FROM Usuario WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuarios() {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, cargo FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRodovias() {
    var instrucaoSql = `
        SELECT r.idRodovia, r.nome, r.denominacao, r.regionalDer,
        r.regionalAdmSp, r.fkConcessionaria, c.nome AS nomeConcessionaria
        FROM Rodovia as r JOIN Concessionaria as c
        ON r.fkConcessionaria = c.idConcessionaria;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, cargo) {

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `INSERT INTO Usuario (nome, email, senha, cargo) VALUES ('${nome}', '${email}', SHA2('${senha}', 256), '${cargo}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPorEmail(email) {

    var instrucaoSql = `SELECT * FROM Usuario WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarLog(descricao, tipo = 'INFO') {

    var instrucaoSql = `INSERT INTO Log (tipo, descricao, dataCriacao) VALUES ('${tipo}', '${descricao}', NOW(6));`;
    console.log("Executando a instrução SQL de LOG: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    autenticar,
    cadastrar,
    buscarPorEmail,
    registrarLog,
    listarUsuarios,
    deletar,
    editar,
    editarUsuarioUnico,
    listarRodovias,
    editarRodovia
};