CREATE DATABASE IF NOT EXISTS moveonV2;
USE moveonV2;


CREATE TABLE Concessionaria (
    idConcessionaria INT PRIMARY KEY,
    nome VARCHAR(45)
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(45),
    cargo VARCHAR(45),
    email VARCHAR(45),
    senha CHAR(64),
    cpf CHAR(14),
    dataCadastro DATETIME
);

CREATE TABLE Log (
    idLog INT PRIMARY KEY,
    tipo VARCHAR(45),
    descricao TEXT,
    dataCriacao DATETIME,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Notificacao (
    idNotificacao INT PRIMARY KEY,
    dataHoraEmissao DATETIME,
    titulo VARCHAR(45),
    mensagem TEXT,
    fkUsuario INT,
    fkConcessionaria INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Rodovia (
    idRodovia INT PRIMARY KEY,
    denominacaoRodovia VARCHAR(45),
    municipioRodovia VARCHAR(45),
    regiaoRodovia VARCHAR(45),
    regNao VARCHAR(45),
    nomeRodovia VARCHAR(45),
    fkConcessionaria INT,
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Veiculo (
    idVeiculo INT PRIMARY KEY,
    tipo VARCHAR(45),
    porte VARCHAR(15),
    placa CHAR(8)
);


CREATE TABLE Acidente (
    idAcidente INT PRIMARY KEY,
    km DECIMAL,
    dataAcidente DATE,
    horaAcidente DATETIME,
    tipoAcidente VARCHAR(45),
    causaAcidente VARCHAR(45),
    clima VARCHAR(45),
    viMort INT,
    viFer INT,
    viFata INT,
    tipoPista VARCHAR(45),
    fkRodovia INT,
    fkVeiculo INT,
    FOREIGN KEY (fkRodovia) REFERENCES Rodovia(idRodovia),
    FOREIGN KEY (fkVeiculo) REFERENCES Veiculo(idVeiculo)
);
