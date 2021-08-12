import express from 'express';

// Imports dos controllers
import UserControllers from './controllers/user';
import { Request, Response } from 'express';
// Estanciamento dos controllers
const userControllers = new UserControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller
//Users
routes.get('/users', userControllers.index);

export default routes;
