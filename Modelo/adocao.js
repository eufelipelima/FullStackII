import AdocaoDAO from "../Persistencia/adocaoDAO.js";


export default class Adocao {
 
    #codigo;
    #dataAdocao;
    #statusAdocao;
    #adotante;
    #animaisAdotados;

    constructor(
        codigo = 0,
        dataAdocao = '',
        statusAdocao = '',
        adotante = 0,
        animaisAdotados = ''
    ) {
        this.#codigo = codigo;
        this.#dataAdocao = dataAdocao;
        this.#statusAdocao = statusAdocao;
        this.#adotante = adotanteCodigo;
        this.#animaisAdotados = animaisAdotados;
    }
    
    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    
    get dataAdocao(){
        return this.#dataAdocao;
    }

    set dataAdocao(novaDataAdocao){
        this.#dataAdocao = novaDataAdocao;
    }

    get statusAdocao(){
        return this.#statusAdocao;
    }

    set statusAdocao(novoStatusAdocao){
        this.#statusAdocao = novoStatusAdocao;
    }

    get adotante(){
        return this.#adotante;
    }

    set adotante(novoAdotante){
        this.#adotante = novoAdotante;
    }

    get animaisAdotados(){
        return this.#animaisAdotados;
    }

    set animaisAdotados(novoAnimalAdotado){
        this.#animaisAdotados = novoAnimalAdotado;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            dataAdocao: this.#dataAdocao,
            statusAdocao: this.#statusAdocao,
            adotante: this.#adotante,
            animaisAdotados: this.#animaisAdotados
        };
    }

    async gravar() {
        const adocaoDAO = new AdocaoDAO();
        await adocaoDAO.gravar(this);
    }

    async excluir() {
        const adocaoDAO = new AdocaoDAO();
        await adocaoDAO.excluir(this);
    }

    async atualizar() {
        const adocaoDAO = new AdocaoDAO();
        await adocaoDAO.atualizar(this);
    }

    async consultar(parametro) {
        const adocaoDAO = new AdocaoDAO();
        return await adocaoDAO.consultar(parametro);
    }

}