var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, cargo FROM usuario WHERE email = '${email}' AND senha = SHA2('${senha}', 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, email, nome) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
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
        UPDATE usuario 
        SET ${campos.join(", ")}
        WHERE id = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    var instrucaoSql = `
        DELETE FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuarios() {
    var instrucaoSql = `
        SELECT id, nome, email, cargo FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, cargo) {

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `INSERT INTO usuario (nome, email, senha, cargo) VALUES ('${nome}', '${email}', SHA2('${senha}', 256), '${cargo}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPorEmail(email) {

    var instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarLog(descricao, tipo = 'INFO') {

    var instrucaoSql = `INSERT INTO logs (tipo, descricao, dataCriacao) VALUES ('${tipo}', '${descricao}', NOW(6));`;
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
    editar
};