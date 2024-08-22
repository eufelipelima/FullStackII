import Adotante from "../Modelo/adotante.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class AdotanteDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS adotante(
                    adotante_codigo INT NOT NULL AUTO_INCREMENT,
                    adotante_nome VARCHAR(100) NOT NULL,
                    adotante_telefone VARCHAR(15) NOT NULL,
                    adotante_email VARCHAR(100) NOT NULL,
                    adotante_endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_adotante PRIMARY KEY (adotante_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(adotante){
        if (adotante instanceof Adotante){
            const sql = "INSERT INTO adotante(adotante_nome) VALUES(?)"; 
            const parametros = [adotante.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            adotante.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(adotante){
        if (adotante instanceof Adotante){
            const sql = "UPDATE adotante SET adotante_nome = ? WHERE adotante_codigo = ?"; 
            const parametros = [adotante.nome, adotante.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(adotante){
        if (adotante instanceof Adotante){
            const sql = "DELETE FROM adotante WHERE adotante_codigo = ?"; 
            const parametros = [adotante.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
          
            sql='SELECT * FROM adotante WHERE adotante_codigo = ? order by adotante_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM adotante WHERE adotante_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaAdotantes = [];
        for (const registro of registros){
            const adotante = new Adotante(registro.adotante.codigo,registro.adotante.nome);
            listaAdotantes.push(adotante);
        }
        return listaAdotantes;
    }

    async possuiAnimais(adotante) {
        if (adotante instanceof Adotante) {
            const sql = `SELECT count(*) FROM animal a
            INNER JOIN adotante p ON a.adotante_codigo = p.adotante_codigo
            WHERE animal_codigo = ?`;
            const parametros = [adotante.codigo];
            const [registros] = await global.poolConexoes.execute(sql,parametros);
            return registros[0].qtd > 0;
        }
    }
}