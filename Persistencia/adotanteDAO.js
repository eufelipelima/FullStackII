import Adotante from "../Modelo/adotante.js";
import conectar from "./conexao.js";

export default class AdotanteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS adotante (
                    adotante_codigo INT NOT NULL AUTO_INCREMENT,
                    adotante_nome VARCHAR(100) NOT NULL,
                    adotante_telefone VARCHAR(15) NOT NULL,
                    adotante_email VARCHAR(100) NOT NULL,
                    adotante_endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_adotante PRIMARY KEY (adotante_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(adotante) {
        if (adotante instanceof Adotante) {
            const sql = "INSERT INTO adotante (adotante_nome, adotante_telefone, adotante_email, adotante_endereco) VALUES (?, ?, ?, ?)";
            const parametros = [adotante.nome, adotante.telefone, adotante.email, adotante.endereco];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            adotante.codigo = retorno[0].insertId;
            await conexao.release();
        }
    }

    async atualizar(adotante) {
        if (adotante instanceof Adotante) {
            const sql = "UPDATE adotante SET adotante_nome = ?, adotante_telefone = ?, adotante_email = ?, adotante_endereco = ? WHERE adotante_codigo = ?";
            const parametros = [adotante.nome, adotante.telefone, adotante.email, adotante.endereco, adotante.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(adotante) {
        if (adotante instanceof Adotante) {
            const sql = "DELETE FROM adotante WHERE adotante_codigo = ?";
            const parametros = [adotante.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM adotante WHERE adotante_codigo = ? order by adotante_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM adotante WHERE adotante_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaAdotantes = [];

        for (const registro of registros) {
            const adotante = new Adotante(
                registro.adotante_codigo,
                registro.adotante_nome,
                registro.adotante_telefone,
                registro.adotante_email,
                registro.adotante_endereco,
            );
            listaAdotantes.push(adotante);
        }

        await conexao.release();
        return listaAdotantes;
    }
}
