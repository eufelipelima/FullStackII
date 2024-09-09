import { Router } from "express";
import AnimalCtrl from "../Controle/animalCtrl.js";

const animalCtrl = new AnimalCtrl();
const rotaAnimal = new Router();

rotaAnimal
.get('/', animalCtrl.consultar)
.post('/', animalCtrl.gravar)
.put('/', animalCtrl.atualizar)
.delete('/', animalCtrl.excluir);

export default rotaAnimal;
