import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
    // Definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }


    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
        };
    }

    async gravar() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.gravar(this);
    }

    async excluir() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.excluir(this);
    }

    async atualizar() {
        const categoriaDAO = new CategoriaDAO();
        await categoriaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const categoria = new Categoria();
        return await categoria.consultar(parametro);
    }
}