import Adotante from '../Modelo/adotante.js';

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
                        "mensagem": "Erro ao registrar o adotante: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do adotante segundo a documentação da API!"
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
                adotante.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Adotante atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o adotante: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do adotante para atualização!"
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
                adotante.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Adotante excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o adotante: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça o código do adotante para exclusão!"
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
        const codigo = parseInt(requisicao.params.codigo, 10);

        if (requisicao.method === 'GET') {
            if (!isNaN(codigo)) {
                const adotante = new Adotante(codigo);
                adotante.consultar().then((resultado) => {
                    resposta.json({
                        status: true,
                        adotante: resultado
                    });
                })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter o adotante: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça um código de adotante válido!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar um adotante!"
            });
        }
    }
}
