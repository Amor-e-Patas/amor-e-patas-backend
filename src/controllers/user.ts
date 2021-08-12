import { Request, Response } from 'express';
import db from '../database/';
export default class UsersController {

  async index(req: Request, res: Response) {
    try {
      const users = await db('user')
        .select(
          'user.id',
          'user.name',
          'user.login',
          'user.password',
        );
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os usuários.'
      });
    }
  }
}
