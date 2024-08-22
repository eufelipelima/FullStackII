import AnimalDAO from "../Persistencia/animalDAO.js";
import Adotante from "./adotante.js";

export default class Animal{
    #codigo;
    #nome;
    #raca;
    #sexo;
    #especie;
    #dataNascimento;
    #dataCadastro;
    #adotante;


    constructor(codigo=0,nome="", raca='', 
                sexo='',especie='', dataNascimento ='', dataCadastro='', adotante=null
                ){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#raca=raca;
        this.#sexo=sexo;
        this.#especie=especie;
        this.#dataNascimento=dataNascimento;
        this.#dataCadastro=dataCadastro;
        this.#adotante=adotante;
    }

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
        this.#nome=novoNome;
    }

    get raca(){
        return this.#raca;
    }

    set raca(novaRaca){
        this.#raca = novaRaca
    }

    get sexo(){
        return this.#sexo;
    }
    
    set sexo(novoSexo){
        this.#sexo = novoSexo
    }

    get especie(){
        return this.#especie;
    }

    set especie(novaEspecie){
        this.#especie = novaEspecie;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascimento){
        this.#dataNascimento = novaDataNascimento;
    }

    get dataCadastro() {
        return this.#dataCadastro;
    }

    set dataCadastro(novaDataCadastro) {
        this.#dataCadastro = novaDataCadastro;
    }

    get adotante() {
        return this.#adotante;
    }

    set adotante(novoAdotante) {
        if(novoAdotante instanceof Adotante){
            this.#adotante = novoAdotante;
        }
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            raca:this.#raca,
            sexo:this.#sexo,
            especie:this.#especie,
            dataNascimento:this.#dataNascimento,
            dataCadastro:this.#dataCadastro,  
            adotante:this.#adotante.toJSON()
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const animalDAO = new AnimalDAO();
        await animalDAO.gravar(this);
     }
 
     async excluir(){
        const animalDAO = new AnimalDAO();
        await animalDAO.excluir(this);
     }
 
     async alterar(){
        const animalDAO = new AnimalDAO();
        await animalDAO.atualizar(this);
     }
 
     async consultar(termo){
        const animalDAO = new AnimalDAO();
        return await animalDAO.consultar(termo);
     }

}