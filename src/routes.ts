import express from 'express';
import { Request, Response } from 'express';

// Imports dos controllers
import UserControllers from './controllers/user';

// Estanciamento dos controllers
const userControllers = new UserControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users
routes.get('/users', userControllers.index);
routes.get('/user/:id', userControllers.show)
routes.post('/user', userControllers.create);
routes.put('/user', userControllers.update);
routes.delete('/user/:id', userControllers.delete);

export default routes;