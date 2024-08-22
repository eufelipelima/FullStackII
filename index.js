import express from 'express';
import cors from 'cors';
import rotaAdotante from './Rotas/rotaAdotante.js';
import rotaAnimal from './Rotas/rotaAnimal.js';

const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/adotante',rotaAdotante);
app.use('/animal',rotaAnimal);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
