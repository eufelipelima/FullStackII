import Categoria from "../Modelo/categoria.js";
import conectar from "./conexao.js";


export default class CategoriaDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria (
                categoria_codigo INT NOT NULL AUTO_INCREMENT,
                categoria_nome VARCHAR(50) NOT NULL, 
                PRIMARY KEY (categoria_codigo)
        );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "INSERT INTO categoria (categoria_nome) VALUES (?)";
            const parametros = [categoria.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            categoria.codigo = retorno[0].insertId;
            await conexao.release();
        }
    }

    async atualizar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "UPDATE categoria SET categoria_nome = ? WHERE categoria_codigo = ?";
            const parametros = [categoria.nome, categoria.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "DELETE FROM categoria WHERE categoria_codigo = ?";
            const parametros = [categoria.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM categoria WHERE categoria_codigo = ?';
            parametros = [parametroConsulta];
        } else {
            sql = "SELECT * FROM categoria WHERE categoria_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaCategorias = [];

        for (const registro of registros) {
            const categoria = new Categoria(
                registro.categoria_codigo,
                registro.categoria_nome
            );
            listaCategorias.push(categoria);
        }

        await conexao.release();
        return listaCategorias;
    }
}