//camada de interface da API que traduz HTTP
import Adotante from "../Modelo/adotante.js";

export default class AdotanteCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const email = dados.email;
            const endereco = dados.endereco;
            if (nome && telefone && email && endereco) {
                const adotante = new Adotante(0, nome, telefone, email, endereco);
                //resolver a promise
                adotante.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": adotante.codigo,
                        "mensagem": "Adotante incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o adotante:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do adotante!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um adotante!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const email = dados.email;
            const endereco = dados.endereco;
            if (codigo && nome && telefone && email && endereco) {
                const adotante = new Adotante(codigo, nome, telefone, email, endereco);
                //resolver a promise
                adotante.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Adotante atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o adotante:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um adotante!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const adotante = new Adotante(codigo);
                adotante.possuiAnimais().then(possui => {
                    if (possui == false) {
                        adotante.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Adotante excluído com sucesso!"
                            });
                        })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Erro ao excluir a adotante:" + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Este adotante possui animais e não pode ser excluída!"
                        });
                    }
                })
                //resolver a promise
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do adotante!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um adotante!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const adotante = new Adotante();
            adotante.consultar(termo).then((listaAdotantes)=>{
                resposta.json(
                    {
                        status:true,
                        listaAdotantes
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os adotantes: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar adotantes!"
            });
        }
    }
}