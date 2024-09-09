import express from 'express';
import cors from 'cors';
import rotaAdotante from './Rotas/rotaAdotante.js';
import rotaAnimal from './Rotas/rotaAnimal.js';
import rotaCategoria from './Rotas/rotaCategoria.js'
import rotaAdocao from './Rotas/rotaAdocao.js'
import session from 'express-session'
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';

dotenv.config();

const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    ressave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }
}));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/adotante',verificarAutenticacao, rotaAdotante);
app.use('/animal', verificarAutenticacao, rotaAnimal);
app.use('/adocao', verificarAutenticacao, rotaAdocao);
app.use('/categoria',verificarAutenticacao ,rotaCategoria);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
