import { Router } from "express";
import AdotanteCtrl from "../Controle/adotanteCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const adotanteCtrl = new AdotanteCtrl();
const rotaAdotante = new Router();

rotaAdotante
.get('/',adotanteCtrl.consultar)
.get('/:termo', adotanteCtrl.consultar)
.post('/',adotanteCtrl.gravar)
.patch('/',adotanteCtrl.atualizar)
.put('/',adotanteCtrl.atualizar)
.delete('/',adotanteCtrl.excluir);

export default rotaAdotante;