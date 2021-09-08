import express from 'express';
import { Request, Response } from 'express';
import ImgAniControllers from '../controllers/imagem_animal';


// Imports dos controllers
import UserControllers from '../controllers/user';

// Estanciamento dos controllers
const userControllers = new UserControllers();
const imgAniControllers = new ImgAniControllers();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users

routes.post('/user', userControllers.create);
routes.get('/imagem/:filename', imgAniControllers.show);



export default routes;