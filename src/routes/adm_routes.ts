import express from 'express';
import { Request, Response } from 'express';

// Imports dos controllers
import PostControllers from '../controllers/post';
import multer from 'multer';
import path from 'path';

// Estanciamento dos controllers
const postControllers = new PostControllers();
const routes = express.Router();


//Post
routes.post('/post', postControllers.create);
routes.put('/post/:id_post', postControllers.update);
routes.delete('/post/:id_post', postControllers.delete);

routes.post("/auth/verifyadm", (req: Request, res: Response) => res.status(200).send());
export default routes;