

export default class DetalheAdocao {
    // Definição dos atributos privados
    #codigo;
    #adocaoCodigo;
    #animalCodigo;
    #observacoes;

    constructor(
        codigo = 0,
        adocaoCodigo = 0,
        animalCodigo = 0,
        observacoes = ''
    ) {
        this.#codigo = codigo;
        this.#adocaoCodigo = adocaoCodigo;
        this.#animalCodigo = animalCodigo;
        this.#observacoes = observacoes;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get adocaoCodigo() {
        return this.#adocaoCodigo;
    }

    set adocaoCodigo(novoAdocaoCodigo) {
        this.#adocaoCodigo = novoAdocaoCodigo;
    }

    get animalCodigo() {
        return this.#animalCodigo;
    }

    set animalCodigo(novoAnimalCodigo) {
        this.#animalCodigo = novoAnimalCodigo;
    }

    get observacoes() {
        return this.#observacoes;
    }

    set observacoes(novasObservacoes) {
        this.#observacoes = novasObservacoes;
    }


    toJSON() {
        return {
            codigo: this.#codigo,
            adocaoCodigo: this.#adocaoCodigo,
            animalCodigo: this.#animalCodigo,
            observacoes: this.#observacoes,
        };
    }

}