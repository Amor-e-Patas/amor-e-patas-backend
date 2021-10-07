import { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import db from '../database/';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export default class AuthControllers {
    async login(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();
        try {
            const { email, password } = req.body;
            
            const login = await trx("db_login").select(
                'senha', 'id_login', 'role'
            ).where('email', email);
        
            const db_usuario = await trx("db_usuario").select(
                'id_usuario', 'id_endereco', 'id_telefone'
            ).where('id_login', login[0].id_login);


            if (login[0].senha == password) {
                // Generate an access token
               
                const accessToken = jwt.sign({id_usuario: db_usuario[0].id_usuario, role: login[0].role, id_login: login[0].id_login, id_endereco: db_usuario[0].id_endereco, id_telefone: db_usuario[0].id_telefone}, process.env.TOKEN_SECRET as string);

                return res.json({
                    accessToken
                });
            } else {
               return res.status(401).json({msg: "E-mail ou senha incorretos!"});
            }

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao retornar JWT.'
            });
        }
    }

}
