import Animal from '../Modelo/animal.js';


export default class AnimalCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const raca = dados.raca;
            const sexo = dados.sexo;
            const especie = dados.especie;
            const dataNascimento = dados.dataNascimento;
            const dataCadastro = dados.dataCadastro;
            const categoria_codigo = dados.categoria.codigo;

            if (nome && raca && sexo && especie
                && dataNascimento && dataCadastro && categoria_codigo > 0) {
                const animal = new Animal(0, nome, raca, sexo, especie,
                    dataNascimento, dataCadastro, categoria_codigo
                );
                //resolver a promise
                animal.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": animal.codigo,
                        "mensagem": "Animal incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o animal: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do animal segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um animal!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const raca = dados.raca;
            const sexo = dados.sexo;
            const especie = dados.especie;
            const dataNascimento = dados.dataNascimento;
            const dataCadastro = dados.dataCadastro;
            const categoria_codigo = dados.categoria.codigo;

            if (codigo && nome && raca && sexo && especie && dataNascimento && dataCadastro && categoria_codigo > 0) {
                const animal = new Animal(codigo, nome, raca, sexo, especie,
                    dataNascimento, dataCadastro, categoria_codigo
                );
                //resolver a promise
                animal.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Animal atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o animal: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do animal segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um animal!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const animal = new Animal(codigo);
                //resolver a promise
                animal.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Animal excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o animal: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do animal!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um animal!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const animal = new Animal();
            animal.consultar(termo).then((listaAnimais) => {
                resposta.json(
                    {
                        status: true,
                        listaAnimais
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os animais: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar animais!"
            });
        }
    }
}
