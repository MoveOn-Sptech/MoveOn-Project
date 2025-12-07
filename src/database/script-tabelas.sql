CREATE DATABASE IF NOT EXISTS moveon;
USE moveon;

CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(512) NOT NULL,
    dataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS Log (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45) NOT NULL,
    descricao TEXT NOT NULL,
    dataCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE IF NOT EXISTS Concessionaria (
    idConcessionaria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);


CREATE TABLE IF NOT EXISTS Rodovia (
    idRodovia INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    denominacao VARCHAR(45),
    municipio VARCHAR(45),
    regionalDer VARCHAR(45),
    regionalAdmSp VARCHAR(45),
    fkConcessionaria INT NOT NULL,
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria),
    PRIMARY KEY (idRodovia, fkConcessionaria)
);


CREATE TABLE IF NOT EXISTS Notificacao (
    idNotificacao INT AUTO_INCREMENT,
    dataCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    fkUsuario INT NOT NULL,
    fkConcessionaria INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkConcessionaria) REFERENCES Concessionaria(idConcessionaria),
    PRIMARY KEY (idNotificacao, fkUsuario, fkConcessionaria)
);


CREATE TABLE IF NOT EXISTS Acidente (
    idAcidente INT AUTO_INCREMENT,
    marcoKm DECIMAL(10, 2) NOT NULL,
    dtHoraAcidente DATETIME NOT NULL,
    tipoAcidente VARCHAR(45) NOT NULL,
    causaAcidente VARCHAR(45) NOT NULL,
    clima VARCHAR(45) NOT NULL,
    qtdVitFatal INT NOT NULL,
    qtdVitGrave INT NOT NULL,
    qtdVitLeve INT NOT NULL,
    tipoPista VARCHAR(45) NOT NULL,
    veiculosEnvolvidos VARCHAR(255) NOT NULL,
    fkRodovia INT NOT NULL,
    fkConcessionaria INT NOT NULL,
   FOREIGN KEY (fkRodovia, fkConcessionaria) REFERENCES Rodovia(idRodovia, fkConcessionaria),
   PRIMARY KEY (idAcidente, fkRodovia, fkConcessionaria)
);
