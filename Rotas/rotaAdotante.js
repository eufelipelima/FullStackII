import { Router } from "express";
import AdotanteCtrl from "../Controle/adotanteCtrl.js";

const adotanteCtrl = new AdotanteCtrl();
const rotaAdotante = new Router();

rotaAdotante
.get('/', adotanteCtrl.consultar)
.post('/', adotanteCtrl.gravar)
.put('/', adotanteCtrl.atualizar)
.delete('/', adotanteCtrl.excluir);

export default rotaAdotante;
