import Adocao from "../Modelo/adocao.js";
import conectar from "./conexao.js";


export default class AdocaoDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS adocao(
                adocao_codigo INT NOT NULL AUTO_INCREMENT,
                data_adocao DATE NOT NULL,
                status_adocao VARCHAR(50), 
                adotante_codigo INT NOT NULL, 
                PRIMARY KEY (adocao_codigo),
                CONSTRAINT fk_adotante_adocao FOREIGN KEY (adotante_codigo) REFERENCES adotante(adotante_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(adocao) {
        if (adocao instanceof Adocao) {
            const sql = "INSERT INTO adocao(data_adocao, status_adocao, adotante_codigo) VALUES(?,?,?)";
            const parametros = [adocao.dataAdocao, adocao.statusAdocao, adocao.adotante.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            adocao.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(adocao) {
        if (adocao instanceof Adocao) {
            const sql = "UPDATE adocao SET data_adocao = ?, status_adocao = ?, adotante_codigo = ? WHERE adocao_codigo = ?";
            const parametros = [adocao.dataAdocao, adocao.statusAdocao, adocao.adotante.codigo, adocao.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(adocao) {
        if (adocao instanceof Adocao) {
            const sql = "DELETE FROM adocao WHERE adocao_codigo = ?";
            const parametros = [adocao.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM adocao WHERE adocao_codigo = ? ORDER BY data_adocao';
            parametros = [parametroConsulta];
        } else {
            sql = "SELECT * FROM adocao WHERE status_adocao LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaAdocoes = [];

        for (const registro of registros) {
            const adotante = new Adotante(registro.adotante_codigo, registro.adotante_nome);
            const adocao = new Adocao(
                registro.adocao_codigo,
                registro.data_adocao,
                registro.status_adocao,
                adotante
            );
            listaAdocoes.push(adocao);
        }

        return listaAdocoes;
    }
}
