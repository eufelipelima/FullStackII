import Animal from "../Modelo/animal.js";
import Adotante from "../Modelo/adotante.js";
import conectar from "./conexao.js";

export default class AnimalDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS animal (
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

            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(animal) {
        if (animal instanceof Animal) {
            const sql = "INSERT INTO animal (animal_nome, animal_raca, animal_sexo, animal_especie, animal_dataNascimento, animal_dataCadastro, categoria_codigo) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const parametros = [animal.nome, animal.raca, animal.sexo, animal.especie, animal.dataNascimento, animal.dataCadastro, animal.categoria.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            animal.codigo = retorno[0].insertId;
            await conexao.release();
        }
    }

    async atualizar(animal) {
        if (animal instanceof Animal) {
            const sql = "UPDATE animal SET animal_nome = ?, animal_raca = ?, animal_sexo = ?, animal_especie = ?, animal_dataNascimento = ?, animal_dataCadastro = ?, categoria_codigo = ? WHERE animal_codigo = ?";
            const parametros = [animal.nome, animal.raca, animal.sexo, animal.especie, animal.dataNascimento, animal.dataCadastro, animal.categoria.codigo, animal.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(animal) {
        if (animal instanceof Animal) {
            const sql = "DELETE FROM animal WHERE animal_codigo = ?";
            const parametros = [animal.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let listaAnimais = [];
    

        if (!termo) {
            termo = "";
        }
    
        try {
            let sql;
            let parametros;
    
            if (!isNaN(parseInt(termo))) {
                sql = `
                    SELECT a.animal_codigo, a.animal_nome, a.animal_raca, 
                           a.animal_sexo, a.animal_especie, a.animal_dataNascimento, 
                           a.animal_dataCadastro, p.adotante_codigo, p.adotante_nome, 
                           p.adotante_telefone, p.adotante_email, p.adotante_endereco
                    FROM animal a
                    INNER JOIN adotante p ON a.adotante_codigo = p.adotante_codigo
                    WHERE a.animal_codigo = ?
                    ORDER BY a.animal_nome
                `;
                parametros = [termo];
            } else {
                // Consulta pela descrição do animal
                sql = `
                    SELECT a.animal_codigo, a.animal_nome, a.animal_raca, 
                           a.animal_sexo, a.animal_especie, a.animal_dataNascimento, 
                           a.animal_dataCadastro, p.adotante_codigo, p.adotante_nome, 
                           p.adotante_telefone, p.adotante_email, p.adotante_endereco
                    FROM animal a
                    INNER JOIN adotante p ON a.adotante_codigo = p.adotante_codigo
                    WHERE a.animal_nome LIKE ?
                    ORDER BY a.animal_nome
                `;
                parametros = ['%' + termo + '%'];
            }
    
            // Executa a consulta
            const [registros] = await conexao.execute(sql, parametros);
    
            // Itera sobre os registros e cria as instâncias de Animal e Adotante
            for (const registro of registros) {
                const adotante = new Adotante(
                    registro.adotante_nome,
                    registro.adotante_telefone,
                    registro.adotante_email,
                    registro.adotante_endereco
                );
    
                const animal = new Animal(
                    registro.animal_codigo,
                    registro.animal_nome,
                    registro.animal_raca,
                    registro.animal_sexo,
                    registro.animal_especie,
                    registro.animal_dataNascimento,
                    registro.animal_dataCadastro,
                    adotante 
                );
    
                listaAnimais.push(animal);
            }
    
        } catch (erro) {
            console.error("Erro ao consultar animais: ", erro.message);
            throw erro;
        } finally {

            await conexao.end();
        }
    
        return listaAnimais;
    }
 }
