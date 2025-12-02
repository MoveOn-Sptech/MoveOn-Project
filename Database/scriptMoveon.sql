CREATE DATABASE IF NOT EXISTS moveon;
USE moveon;


CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cargo VARCHAR(45),
    email VARCHAR(45) NOT NULL,
    senha CHAR(64) NOT NULL,
    cpf CHAR(14),
    dataCadastro DATETIME NOT NULL
);


CREATE TABLE Log (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45) NOT NULL,
    descricao TEXT,
    dataCriacao DATETIME NOT NULL,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Concessionaria (
    idConcessionaria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);


CREATE TABLE Rodovia (
    idRodovia INT PRIMARY KEY AUTO_INCREMENT,
    codigoRodovia VARCHAR(45),
    municipio VARCHAR(45),
    regiao VARCHAR(45),
    uf CHAR(2),
    nome VARCHAR(45) NOT NULL,
    numKmAtual VARCHAR(45),
    fkConcessionaria INT,
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Notificacao (
    idNotificacao INT PRIMARY KEY AUTO_INCREMENT,
    dataCriacao DATETIME NOT NULL,
    municipio VARCHAR(45),
    titulo VARCHAR(45) NOT NULL,
    fkUsuario INT,
    fkConcessionaria INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Acidente (
    idAcidente INT PRIMARY KEY AUTO_INCREMENT,
    km DECIMAL,
    dataAcidente DATE,
    horaAcidente DATETIME,
    tipoOcorrencia VARCHAR(45),
    descricao VARCHAR(45),
    qtdeVeiculos INT,
    qtdeVitimas INT,
    viatura VARCHAR(45),
    tipoPista VARCHAR(45),
    pista VARCHAR(45),
    sentido VARCHAR(45),
    fkRodovia INT,
    fkConcessionaria INT,
    FOREIGN KEY (fkRodovia) REFERENCES Rodovia(idRodovia),
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Veiculo (
    idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45),
    fkAcidente INT,
    Acidente_Rodovia INT,
    Acidente_Concessionaria INT,
    FOREIGN KEY (fkAcidente) REFERENCES Acidente(idAcidente),
    FOREIGN KEY (Acidente_Rodovia) REFERENCES Rodovia(idRodovia),
    FOREIGN KEY (Acidente_Concessionaria) REFERENCES Concessionaria(idConcessionaria)
);
