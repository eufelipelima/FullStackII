CREATE DATABASE sistema;

USE sistema;

CREATE TABLE adotante (
    adotante_codigo INT NOT NULL AUTO_INCREMENT,
    adotante_nome VARCHAR(100) NOT NULL,
    adotante_telefone VARCHAR(15) NOT NULL,
    adotante_email VARCHAR(100) NOT NULL,
    adotante_endereco VARCHAR(200) NOT NULL,
    PRIMARY KEY (adotante_codigo)
);

CREATE TABLE categoria (
    categoria_codigo INT NOT NULL AUTO_INCREMENT,
    categoria_nome VARCHAR(50) NOT NULL, 
    PRIMARY KEY (categoria_codigo)
);

CREATE TABLE animal (
    animal_codigo INT NOT NULL AUTO_INCREMENT,
    animal_nome VARCHAR(100) NOT NULL,
    animal_raca VARCHAR(50) NOT NULL,
    animal_sexo VARCHAR(50) NOT NULL,
    animal_especie VARCHAR(50) NOT NULL,
    animal_dataNascimento DATE,
    animal_dataCadastro DATE NOT NULL,
    categoria_codigo INT NOT NULL, 
    PRIMARY KEY (animal_codigo),
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_codigo) REFERENCES categoria(categoria_codigo)
);

CREATE TABLE adocao (
    adocao_codigo INT NOT NULL AUTO_INCREMENT,
    data_adocao DATE NOT NULL,
    status_adocao VARCHAR(50), 
    adotante_codigo INT NOT NULL, 
    PRIMARY KEY (adocao_codigo),
    CONSTRAINT fk_adotante_adocao FOREIGN KEY (adotante_codigo) REFERENCES adotante(adotante_codigo)
);

CREATE TABLE detalhe_adocao (
    detalhe_codigo INT NOT NULL AUTO_INCREMENT,
    adocao_codigo INT NOT NULL, 
    animal_codigo INT NOT NULL, 
    observacoes TEXT, 
    PRIMARY KEY (detalhe_codigo),
    CONSTRAINT fk_adocao FOREIGN KEY (adocao_codigo) REFERENCES adocao(adocao_codigo),
    CONSTRAINT fk_animal_adocao FOREIGN KEY (animal_codigo) REFERENCES animal(animal_codigo)
);
