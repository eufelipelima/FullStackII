import Animal from '../Modelo/animal.js';
import Adotante from '../Modelo/adotante.js';
import conectar from './conexao.js';

export default class AnimalDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS animal(
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
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(animal) {
        if (animal instanceof Animal) {
            const sql = `INSERT INTO animal(animal_nome, animal_raca,
                animal_sexo, animal_especie, animal_dataNascimento, animal_dataCadastro, adotante_codigo)
                VALUES(?,?,?,?,?,?,?)`;
            const parametros = [animal.nome, animal.raca, animal.sexo, animal.especie,
                animal.dataNascimento, animal.dataCadastro, animal.adotante.codigo
            ];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            animal.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(animal) {
        if (animal instanceof Animal) {
            const sql = `UPDATE animal SET animal_nome = ?, animal_raca = ?,
            animal_sexo = ?, animal_especie = ?, animal_dataNascimento = ?, animal_dataCadastro = ?, adotante_codigo = ?
            WHERE animal_codigo = ?`;
            const parametros = [animal.nome, animal.raca, animal.sexo,
            animal.especie, animal.dataNascimento, animal.dataCadastro, animal.adotante.codigo, animal.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(animal) {
        if (animal instanceof Animal) {
            const sql = `DELETE FROM animal WHERE animal_codigo = ?`;
            const parametros = [animal.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaAnimais = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do animal
            const sql = `SELECT a.animal_codigo, a.animal_nome,
              a.animal_raca, a.animal_sexo, a.animal_especie, 
              a.animal_dataNascimento, a.animal_dataCadastro, p.adotante_codigo, p.adotante_nome,
              p.adotante_telefone, p.adotante_email, p.adotante_endereco
              FROM animal a
              INNER JOIN adotante p ON a.adotante_codigo = p.adotante_codigo
              WHERE a.animal_codigo = ?
              ORDER BY a.animal_nome               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const animal = new Animal(registro.animal_codigo,registro.animal_nome,
                                            registro.animal_raca,registro.animal_sexo,
                                            registro.animal_especie, registro.animal_dataNascimento,
                                            registro.animal_dataCadastro
                                            );
                listaAnimais.push(animal);
            }
        }
        else
        {
            //consulta pela descrição do animal
            const sql = `SELECT a.animal_codigo, a.animal_nome,
                        a.animal_raca, a.animal_sexo, a.animal_especie, 
                        a.animal_dataNascimento, a.animal_dataCadastro, p.adotante_codigo, p.adotante_nome,
                        p.adotante_telefone, p.adotante_email, p.adotante_endereco
                        FROM animal a
                        INNER JOIN adotante p ON a.adotante_codigo = p.adotante_codigo
                        WHERE a.animal_nome like ?
                        ORDER BY a.animal_nome`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros) {
                const adotante = new Adotante(registro.adotante_nome, registro.adotante_telefone, registro.adotante_email, registro.adotante_endereco)
                const animal = new Animal(registro.animal_codigo,registro.animal_nome,
                                            registro.animal_raca,registro.animal_sexo,
                               registro.animal_especie, registro.animal_dataNascimento,
                                            registro.animal_dataCadastro, adotante
                                            );
                listaAnimais.push(animal);
            }
        }

        return listaAnimais;
    }
}