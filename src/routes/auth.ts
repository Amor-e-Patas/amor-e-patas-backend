import express from 'express';
import { Request, Response } from 'express';


// Imports dos controllers
import AuthControllers from '../controllers/auth';

// Estanciamento dos controllers
const authControllers = new AuthControllers();

const routes = express.Router();

//Auth
routes.post('/login', authControllers.login);

export default routes;