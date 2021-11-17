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
import ImgAniControllers from '../controllers/imagem_animal';
import AssuntoControllers from '../controllers/assunto';
import PostControllers from '../controllers/post';
import ImgPostControllers from '../controllers/imagem_post';
import ComentarioController from '../controllers/comentario';
import multer from 'multer';
import path from 'path';

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
const imgAniControllers = new ImgAniControllers();
const assuntoControllers = new AssuntoControllers();
const postControllers = new PostControllers();
const imgPostControllers = new ImgPostControllers();
const comentarioController = new ComentarioController();

const imageUpload = multer({
    //dest: 'images',
    storage: multer.diskStorage({
        destination: 'images',
        filename: (request, file, cb) =>{
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null,fileName);
        },
    })
});

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

routes.get('/temperamento/:id', tempControllers.show);
routes.post('/temperamento', tempControllers.create);
routes.put('/temperamento', tempControllers.update);
routes.delete('/temperamento/:id', tempControllers.delete);

//Sociabilidade

routes.get('/sociavel/:id', sociavelControllers.show);
routes.post('/sociavel', sociavelControllers.create);
routes.put('/sociavel', sociavelControllers.update);
routes.delete('/sociavel/:id', sociavelControllers.delete);

//Vivência

routes.get('/vivencia/:id', vivenciaController.show);
routes.post('/vivencia', vivenciaController.create);
routes.put('/vivencia', vivenciaController.update);
routes.delete('/vivencia/:id', vivenciaController.delete);

//Animal

routes.get('/animais', animalControllers.index);
routes.get('/animaisdesaparecidos', animalControllers.indexDesaparecidos);
routes.get('/animaisaprovados', animalControllers.indexAprovados);
routes.get('/anireprovnormais', animalControllers.indexReprovadosNormais);
routes.get('/anireprovdesaparecidos', animalControllers.indexReprovadosDesaparecidos);
routes.get('/anisanalisenormais', animalControllers.indexEmAnaliseNormais);
routes.get('/anianalisedesaparecidos', animalControllers.indexEmAnaliseDesaparecidos);
routes.get('/anianalisedesaparecidos2', animalControllers.indexEmAnaliseDesaparecidos2);
routes.get('/animalreprovdesa', animalControllers.indexDesaparecidosDesa);
routes.get('/animaisdesaparecidosall', animalControllers.indexAllDesaparecidos);
routes.get('/animaisnegados', animalControllers.indexNegados);
routes.get('/animaisanalise', animalControllers.indexEmAnalise);
routes.get('/animaisanalise2', animalControllers.indexEmAnalise2);
routes.get('/animal/:id_animal', animalControllers.show);
routes.post('/animal', animalControllers.create);
routes.put('/animal/:id_animal', animalControllers.update);
routes.put('/animal/status/:id_animal', animalControllers.updateStatus);
routes.delete('/animal/:id_animal', animalControllers.delete);

//Img Animal

routes.get('/imagens', imgAniControllers.index);
routes.post('/imagem', imageUpload.array('image'), imgAniControllers.create);
routes.put('/imagem', imgAniControllers.update);
routes.delete('/imagem/:filename', imgAniControllers.delete);

//Assunto

routes.post('/assunto', assuntoControllers.create);
routes.put('/assunto', assuntoControllers.update);
routes.delete('/assunto/:id', assuntoControllers.delete);


//Img Animal

routes.get('/imagenspost', imgPostControllers.index);
routes.post('/imagempost', imageUpload.array('image'), imgPostControllers.create);
routes.put('/imagempost', imgPostControllers.update);
routes.delete('/imagempost/:filename', imgPostControllers.delete);

//Comentário

routes.post('/comentario', comentarioController.create);
routes.put('/comentario', comentarioController.update);
routes.delete('/comentario/:id', comentarioController.delete);

routes.post("/auth/verifytoken", (req: Request, res: Response) => res.status(200).json(req.body.user));
export default routes;