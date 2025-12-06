var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 0) {
                        res.status(403).json({ message: "Email e/ou senha inválido(s)" });
                    } else {
                        var cargo = resultadoAutenticar[0].cargo
                        var emailBd = resultadoAutenticar[0].email
                        var nomeBd = resultadoAutenticar[0].nome
                        var id = resultadoAutenticar[0].idUsuario;
                        res.status(200).json(
                            {
                                emailUsuario: emailBd,
                                nomeUsuario: nomeBd,
                                cargoUsuario: cargo,
                                idUsuario: id
                            }
                        );
                    }

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function editar(req, res) {
    var nomeUsuario = req.body.nome;
    var emailUsuario = req.body.email;
    var id = req.body.idUsuarioVar;

    usuarioModel.editar(id, emailUsuario, nomeUsuario)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.affectedRows == 1) {
                    var mensagem = "sucesso";

                    res.status(200).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );

                } else {
                    var mensagem = "fracasso";

                    res.status(400).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao editar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarRodovia(req, res) {
    var idRodovia = req.body.idRodovia;
    var valorDenominacao = req.body.valorDenominacao;
    var valorRegionalAdm = req.body.valorRegionalAdm;
    var valorRegionalDer = req.body.valorRegionalDer;
    var valorFkConcessionaria = req.body.fkConcessionaria;

    usuarioModel.editarRodovia(idRodovia, valorDenominacao, valorRegionalAdm, valorRegionalDer, valorFkConcessionaria)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.affectedRows == 1) {
                    var mensagem = "sucesso";

                    res.status(200).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );

                } else {
                    var mensagem = "fracasso";

                    res.status(400).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao editar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarUsuarioUnico(req, res) {
    var cargoUsuario = req.body.cargo;
    var emailUsuario = req.body.email;
    var id = req.body.idUsuarioVar;

    usuarioModel.editarUsuarioUnico(id, emailUsuario, cargoUsuario)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.affectedRows == 1) {
                    var mensagem = "sucesso";

                    res.status(200).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );

                } else {
                    var mensagem = "fracasso";

                    res.status(400).json(
                        {
                            mensagemRetorno: mensagem
                        }
                    );
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao editar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletarUsuario(req, res) {
    var id = req.body.idUsuarioVar;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        usuarioModel.deletar(id)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.affectedRows == 1) {
                        var mensagem = "sucesso";

                        res.status(200).json(
                            {
                                mensagemRetorno: mensagem
                            }
                        );

                    } else {
                        var mensagem = "fracasso";

                        res.status(400).json(
                            {
                                mensagemRetorno: mensagem
                            }
                        );
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarUsuarios(req, res) {

    var cargos = [];
    var emails = [];
    var nomes = [];
    var ids = [];

    usuarioModel.listarUsuarios()
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Email e/ou senha inválido(s)" });
                } else {

                    for (let i = 0; i < resultadoAutenticar.length; i++) {

                        cargos[i] = resultadoAutenticar[i].cargo;
                        emails[i] = resultadoAutenticar[i].email;
                        nomes[i] = resultadoAutenticar[i].nome;
                        ids[i] = resultadoAutenticar[i].id;

                    }

                    res.status(200).json(
                        {
                            cargo: cargos,
                            nome: nomes,
                            email: emails,
                            id: ids
                        }
                    );
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarRodovias(req, res) {

    var listaIdRodovia = [];
    var listaNomeRodovia = [];
    var listaDenominacao = [];
    var listaConcessionaria = [];
    var listaRegionalAdm = [];
    var listaRegionalDer = [];
    var listaFkConcessionaria = [];

    usuarioModel.listarRodovias()
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 0) {
                    res.status(403).json({ message: "Email e/ou senha inválido(s)" });
                } else {

                    for (let i = 0; i < resultadoAutenticar.length; i++) {

                        listaIdRodovia[i] = resultadoAutenticar[i].idRodovia;
                        listaNomeRodovia[i] = resultadoAutenticar[i].nomeRodovia;
                        listaDenominacao[i] = resultadoAutenticar[i].denominacaoRodovia;
                        listaConcessionaria[i] = resultadoAutenticar[i].nomeConcessionaria;
                        listaRegionalAdm[i] = resultadoAutenticar[i].regionalAdmSp;
                        listaRegionalDer[i] = resultadoAutenticar[i].regionalDer;
                        listaFkConcessionaria[i] = resultadoAutenticar[i].fkConcessionaria;

                    }

                    res.status(200).json(
                        {
                            idsRodovia: listaIdRodovia,
                            nomesRodovia: listaNomeRodovia,
                            denominacoes: listaDenominacao,
                            regionaisAdm: listaRegionalAdm,
                            regionaisDer: listaRegionalDer,
                            concessionarias: listaConcessionaria,
                            fks: listaFkConcessionaria
                        }
                    );
                }

            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var cargo = req.body.cargo;


    // Faça as validações dos valores
    if (nome == undefined ||
        email == undefined ||
        senha == undefined ||
        cargo == undefined) {
        res.status(400).send("Dados invalidos");
        return;
    }


    usuarioModel.buscarPorEmail(email).then(
        function (resultado) {
            console.log(resultado)
            if (resultado.length > 0) {
                res.status(401).send("Este email já está cadastrado!");
                return;
            } else {
                usuarioModel.cadastrar(nome, email, senha, cargo)
                    .then(
                        function (resultado) {

                            // salve salve aqui eh ponto de registro do log
                            const logMsg = `Usuário cadastrado. ID: ${resultado.insertId || 'ID indisponível'}, Nome: ${nome}, Email: ${email}`;
                            usuarioModel.registrarLog(logMsg, 'INFO');
                            // ----------------------------------------------------------------
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
            }
        }
    );

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js


}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuarios,
    deletarUsuario,
    editar,
    editarUsuarioUnico,
    listarRodovias,
    editarRodovia
}