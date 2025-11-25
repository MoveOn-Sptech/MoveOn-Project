CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;


CREATE TABLE Concessionaria (
    idConcessionaria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45)
);


CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    cargo VARCHAR(45),
    email VARCHAR(255),
    senha CHAR(512),
    cpf CHAR(14),
    dataCadastro DATETIME,
    fkConcessionaria INT,
    CONSTRAINT fk_usuario_concessionaria
        FOREIGN KEY (fkConcessionaria)
        REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Rodovia (
    idRodovia INT AUTO_INCREMENT PRIMARY KEY,
    denominacaoRodovia VARCHAR(45),
    municipio VARCHAR(45),
    trecho VARCHAR(45),
    kmInicial VARCHAR(45),
    kmFinal VARCHAR(45),
    nomeRodovia VARCHAR(45),
    fkConcessionaria INT,
    CONSTRAINT fk_rodovia_concessionaria
        FOREIGN KEY (fkConcessionaria)
        REFERENCES Concessionaria(idConcessionaria)
);


CREATE TABLE Veiculo (
    idVeiculo INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45),
    porte VARCHAR(15),
    placa CHAR(8)
);


CREATE TABLE Acidente (
    idAcidente INT AUTO_INCREMENT PRIMARY KEY,
    marcam DECIMAL,
    dataAcidente DATE,
    horaAcidente DATETIME,
    tipoAcidente VARCHAR(45),
    causaAcidente VARCHAR(45),
    clima VARCHAR(45),
    vitFatal INT,
    vitGrave INT,
    vitLeve INT,
    tipoPista VARCHAR(45),
    fkRodovia INT,
    Veiculo_idVeiculo INT,
    CONSTRAINT fk_acidente_rodovia
        FOREIGN KEY (fkRodovia)
        REFERENCES Rodovia(idRodovia),
    CONSTRAINT fk_acidente_veiculo
        FOREIGN KEY (Veiculo_idVeiculo)
        REFERENCES Veiculo(idVeiculo)
);

CREATE TABLE Notificacao (
    idNotificacao INT AUTO_INCREMENT PRIMARY KEY,
    dataNotificacao DATETIME,
    tipo VARCHAR(45),
    mensagem TEXT,
    fkUsuario INT,
    CONSTRAINT fk_notificacao_usuario
        FOREIGN KEY (fkUsuario)
        REFERENCES Usuario(idUsuario)
);


CREATE TABLE Log (
    idLog INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45),
    descricao TEXT,
    dataCriacao DATETIME,
    fkUsuario INT,
    CONSTRAINT fk_log_usuario
        FOREIGN KEY (fkUsuario)
        REFERENCES Usuario(idUsuario)
);
