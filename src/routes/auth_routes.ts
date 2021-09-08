import express from 'express';
import { Request, Response } from 'express';


// Imports dos controllers
import UserControllers from '../controllers/user';
import TelefoneControllers from '../controllers/telefone';
import EnderecoControllers from '../controllers/endereco';
import LoginControllers from '../controllers/login';
import EspecieControllers from '../controllers/especie'
import SexoControllers from '../controllers/sexo_animal'
import PorteController from '../controllers/porte';
import TemperamentoController from '../controllers/temperamento';
import AnimalController from '../controllers/animal';
import SociavelController from '../controllers/sociavel';
import VivenciaController from '../controllers/vivencia';

// Estanciamento dos controllers
const userControllers = new UserControllers();
const telefoneControllers = new TelefoneControllers();
const enderecoControllers = new EnderecoControllers();
const loginControllers = new LoginControllers();
const especieControllers = new EspecieControllers();
const sexoControllers = new SexoControllers();
const porteControllers = new PorteController();
const tempControllers = new TemperamentoController();
const animalControllers = new AnimalController();
const sociavelControllers = new SociavelController();
const vivenciaController =  new VivenciaController();

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

//Porte

routes.get('/portes', porteControllers.index);
routes.get('/porte/:id', porteControllers.show);
routes.post('/porte', porteControllers.create);
routes.put('/porte', porteControllers.update);
routes.delete('/porte/:id', porteControllers.delete);

//Temperamento

routes.get('/temperamentos', tempControllers.index);
routes.get('/temperamento/:id', tempControllers.show);
routes.post('/temperamento', tempControllers.create);
routes.put('/temperamento', tempControllers.update);
routes.delete('/temperamento/:id', tempControllers.delete);

//Sociabilidade

routes.get('/sociaveis', sociavelControllers.index);
routes.get('/sociavel/:id', sociavelControllers.show);
routes.post('/sociavel', sociavelControllers.create);
routes.put('/sociavel', sociavelControllers.update);
routes.delete('/sociavel/:id', sociavelControllers.delete);

//Vivência

routes.get('/vivencias', vivenciaController.index);
routes.get('/vivencia/:id', vivenciaController.show);
routes.post('/vivencia', vivenciaController.create);
routes.put('/vivencia', vivenciaController.update);
routes.delete('/vivencia/:id', vivenciaController.delete);

//Animal

routes.get('/animais', animalControllers.index);
routes.get('/animal/:id', animalControllers.show);
routes.post('/animal', animalControllers.create);
routes.put('/animal', animalControllers.update);
routes.delete('/animal/:id', animalControllers.delete);

routes.post("/auth/verifytoken", (req: Request, res: Response) => res.status(200).send());
export default routes;