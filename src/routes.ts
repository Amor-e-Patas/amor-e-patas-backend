import express from 'express';
import { Request, Response } from 'express';
import TelefoneControllers from './controllers/telefone';

// Imports dos controllers
import UserControllers from './controllers/user';

// Estanciamento dos controllers
const userControllers = new UserControllers();
const telefoneControllers = new TelefoneControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users
routes.get('/users', userControllers.index);
routes.get('/user/:id', userControllers.show)
routes.post('/user', userControllers.create);
routes.put('/user', userControllers.update);
routes.delete('/user/:id', userControllers.delete);

//Telefone
routes.get('/telefones', telefoneControllers.index);
routes.get('/telefone/:id', telefoneControllers.show)
routes.post('/telefone', telefoneControllers.create);
routes.put('/telefone', telefoneControllers.update);
routes.delete('/telefone/:id', telefoneControllers.delete);

export default routes;