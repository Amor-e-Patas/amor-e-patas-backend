import express from 'express';
import { Request, Response } from 'express';


// Imports dos controllers
import UserControllers from '../controllers/user';

// Estanciamento dos controllers
const userControllers = new UserControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users

routes.post('/user', userControllers.create);


export default routes;