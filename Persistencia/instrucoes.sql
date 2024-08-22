CREATE DATABASE sistema;

USE sistema;

CREATE TABLE adotante (
    adotante_codigo INT NOT NULL AUTO_INCREMENT,
    adotante_nome VARCHAR(100) NOT NULL,
    adotante_telefone VARCHAR(15) NOT NULL,
    adotante_email VARCHAR(100)NOT NULL,
    adotante_endereco VARCHAR(200)NOT NULL,
    CONSTRAINT pk_adotante PRIMARY KEY (adotante_codigo)
);

CREATE TABLE animal (
    animal_codigo INT NOT NULL AUTO_INCREMENT,
    animal_nome VARCHAR(100) NOT NULL,
    animal_raca VARCHAR(50)NOT NULL,
    animal_sexo VARCHAR(50)NOT NULL,
    animal_especie VARCHAR(50)NOT NULL,
    animal_dataNascimento DATE,
    animal_dataCadastro DATE,
    adotante_codigo INT NOT NULL,
    CONSTRAINT pk_animal PRIMARY KEY (animal_codigo),
    CONSTRAINT fk_adotante FOREIGN KEY(adotante_codigo) REFERENCES adotante(adotante_codigo)
);
