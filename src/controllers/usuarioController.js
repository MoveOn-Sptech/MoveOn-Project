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
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        var cargo = resultadoAutenticar[0].cargo
                        res.status(200).json(
                            {
                                cargoUsuario: cargo
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
    cadastrar
}