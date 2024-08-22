import { Router } from "express";
import AnimalCtrl from "../Controle/animalCtrl.js";

const animalCtrl = new AnimalCtrl();
const rotaAnimal = new Router();

rotaAnimal
.get('/', animalCtrl.consultar)
.get('/:termo', animalCtrl.consultar)
.post('/', animalCtrl.gravar)
.patch('/', animalCtrl.atualizar)
.put('/', animalCtrl.atualizar)
.delete('/', animalCtrl.excluir);

export default rotaAnimal;