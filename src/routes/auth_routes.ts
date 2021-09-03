import express from 'express';
import { Request, Response } from 'express';


// Imports dos controllers
import UserControllers from '../controllers/user';
import TelefoneControllers from '../controllers/telefone';
import EnderecoControllers from '../controllers/endereco';
import LoginControllers from '../controllers/login';
import EspecieControllers from '../controllers/especie'
import SexoControllers from '../controllers/sexo_animal'

// Estanciamento dos controllers
const userControllers = new UserControllers();
const telefoneControllers = new TelefoneControllers();
const enderecoControllers = new EnderecoControllers();
const loginControllers = new LoginControllers();
const especieControllers = new EspecieControllers();
const sexoControllers = new SexoControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users
routes.get('/users', userControllers.index);
routes.get('/user', userControllers.show);
routes.put('/user', userControllers.update);
routes.delete('/user/:id', userControllers.delete);

//Telefone
routes.get('/telefones', telefoneControllers.index);
routes.get('/telefone', telefoneControllers.show);
routes.post('/telefone', telefoneControllers.create);
routes.put('/telefone', telefoneControllers.update);
routes.delete('/telefone/:id', telefoneControllers.delete);

//Endereço
routes.get('/enderecos', enderecoControllers.index);
routes.get('/endereco', enderecoControllers.show);
routes.post('/endereco', enderecoControllers.create);
routes.put('/endereco', enderecoControllers.update);
routes.delete('/endereco/:id', enderecoControllers.delete);

//Login

routes.get('/logins', loginControllers.index);
routes.get('/login', loginControllers.show);
routes.post('/login', loginControllers.create);
routes.put('/login', loginControllers.update);
routes.delete('/login/:id', loginControllers.delete);

//Espécies

routes.get('/especies', especieControllers.index);
routes.get('/especie/:id', especieControllers.show);
routes.post('/especie', especieControllers.create);
routes.put('/especie', especieControllers.update);
routes.delete('/especie/:id', especieControllers.delete);

//Sexo

routes.get('/sexos', sexoControllers.index);
routes.get('/sexo/:id', sexoControllers.show);
routes.post('/sexo', sexoControllers.create);
routes.put('/sexo', sexoControllers.update);
routes.delete('/sexo/:id', sexoControllers.delete);

routes.post("/auth/verifytoken", (req: Request, res: Response) => res.status(200).send());
export default routes;