import { Router } from "express";
import AdocaoCtrl from "../Controle/adocaoCtrl.js";

const adocaoCtrl = new AdocaoCtrl();
const rotaAdocao = new Router();

rotaAdocao
.get('/:termo', adocaoCtrl.consultar)
.post('/', adocaoCtrl.gravar)


export default rotaAdocao;