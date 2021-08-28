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
            console.log(email, password);
            const login = await trx("db_login").select(
                'senha', 'id_login'
            ).where('email', email);
        
            const [id_usuario] = await trx("db_usuario").select(
                'id_usuario'
            ).where('id_login', login[0].id_login);

            if (login[0].senha == password) {
                // Generate an access token
                const accessToken = jwt.sign({ id_usuario, role: 'role', id_login: login[0].id_login}, process.env.TOKEN_SECRET as string);

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
