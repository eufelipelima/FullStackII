import Adocao from '../Modelo/adocao.js';
import Adotante from '../Modelo/adotante.js';
import Animal from '../Modelo/animal.js';

export default class AdocaoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const data_adocao = dados.data_adocao;
            const status_adocao = dados.status_adocao;
            const adotante_codigo = dados.adotante.codigo;
            const animaisAdotados = dados.animaisAdotados; // Espera-se um array de objetos

            if (data_adocao && status_adocao && adotante_codigo > 0 && Array.isArray(animaisAdotados)) {
                const adotante = new Adotante(adotante_codigo);
                const adocao = new Adocao(0, data_adocao, status_adocao, adotante);
                
                // Grava a adoção
                adocao.gravar().then(async () => {
                    // Para cada animal adotado, grava os detalhes da adoção
                    for (const animal of animaisAdotados) {
                        const { animal_codigo, observacoes } = animal;
                        const detalheAdocao = {
                            adocao_codigo: adocao.codigo,
                            animal_codigo,
                            observacoes
                        };
                        await adocao.gravarDetalhe(detalheAdocao);
                    }

                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": adocao.codigo,
                        "mensagem": "Adoção incluída com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a adoção: " + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados da adoção segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma adoção!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        // Obtém o ID da adoção da URL (parâmetro de rota)
        const adocao_id = parseInt(requisicao.params.adocao_id, 10);

        if (requisicao.method === 'GET') {
            if (!isNaN(adocao_id)) {
                const adocao = new Adocao(adocao_id);
                adocao.consultar().then((resultado) => {
                    resposta.json({
                        status: true,
                        adocao: resultado
                    });
                })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter a adoção: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça um ID de adoção válido!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma adoção!"
            });
        }
    }
}