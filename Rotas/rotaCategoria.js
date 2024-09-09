import { Router } from "express";
import CategoriaCtrl from "../Controle/categoriaCtrl.js";

const categoriaCtrl = new CategoriaCtrl();
const rotaCategoria = new Router();

rotaCategoria
.get('/', categoriaCtrl.consultar)
.post('/', categoriaCtrl.gravar)
.put('/', categoriaCtrl.atualizar)
.delete('/', categoriaCtrl.excluir);

export default rotaCategoria;