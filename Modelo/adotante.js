import AdotanteDAO from "../Persistencia/adotanteDAO.js";
import AnimalDAO from "../Persistencia/animalDAO.js";
//não esqueça do .js no final da importação

export default class Adotante {
    //definição dos atributos privados
    #codigo;
    #nome;
    #telefone;
    #email;
    #endereco;

    constructor(codigo=0, nome='', telefone='', email='', endereco=''){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#telefone=telefone;
        this.#email=email;
        this.#endereco=endereco;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email=novoEmail;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco=novoEndereco;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            telefone:this.#telefone,
            email:this.#email,
            endereco:this.#endereco,
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const adotanteDAO = new AdotanteDAO();
        await adotanteDAO.gravar(this);
    }

    async excluir(){
        const adotanteDAO = new AdotanteDAO();
        await adotanteDAO.excluir(this);
    }

    async atualizar(){
        const adotanteDAO = new AdotanteDAO();
        await adotanteDAO.atualizar(this);

    }

    async consultar(parametro){
        const adotanteDAO = new AdotanteDAO();
        return await adotanteDAO.consultar(parametro);
    }

    async possuiAnimais() {
        const adotanteDAO = new AdotanteDAO();
        return await adotanteDAO.possuiAnimais(this);
    }
}