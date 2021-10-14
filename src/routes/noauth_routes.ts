import express from 'express';
import { Request, Response } from 'express';
import ImgAniControllers from '../controllers/imagem_animal';
import PostControllers from '../controllers/post';
import AssuntoControllers from '../controllers/assunto';
import ComentarioController from '../controllers/comentario';
import AnimalController from '../controllers/animal';

// Imports dos controllers
import UserControllers from '../controllers/user';

// Estanciamento dos controllers
const userControllers = new UserControllers();
const imgAniControllers = new ImgAniControllers();
const postControllers = new PostControllers();
const assuntoControllers = new AssuntoControllers();
const comentarioController = new ComentarioController();
const animalControllers = new AnimalController();

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

// Criação das rotas para executar cada controller

//Users

routes.post('/user', userControllers.create);
routes.get('/images/:filename', imgAniControllers.show);

//Post

routes.get('/posts', postControllers.index);
routes.get('/postsall', postControllers.showAll);
routes.get('/post/:id_post', postControllers.show);

//Assunto

routes.get('/assuntos', assuntoControllers.index);
routes.get('/assunto/:id', assuntoControllers.show);

//Comentário

routes.get('/comentarios/:id', comentarioController.index);
routes.get('/comentario/:id', comentarioController.show);

//Animais


routes.get('/aniaprovnormais', animalControllers.indexAprovadosNormais);

export default routes;