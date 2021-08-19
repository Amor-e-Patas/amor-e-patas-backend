import { Request, Response } from 'express';
import db from '../database';

export default class LoginControllers {
  async index(req: Request, res: Response) {
    try {
      const logins = await db('db_login')
        .select(
          'db_login.email',
          'db_login.senha'
        );
      return res.status(200).json(logins);

    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar os logins.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { email } = req.params;

    try {
      const login = await db('db_login')
        .select(
          'db_login.email',
          'db_login.senha'
        )
        .where('db_login.email', email)
        ;
      return res.status(200).json(login);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o login.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        email,
        senha
      } = req.body;

      const db_login = await trx('db_login').insert({email, senha});

      await trx.commit();
      return res.status(201).json({
        msg : "Login cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar login.'
      });
    }
  }
  async update(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        email,
        senha
      } = req.body;
      
      const db_login = {
        email: email,
        senha: senha
      }

      await trx('db_login').update(db_login).where('email', email);

      await trx.commit();

      return res.status(201).json({
        msg : "Login atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar login.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { email } = req.params;
      await trx('db_login').delete().where('email',email);
      await trx.commit();

      return res.status(201).json({
        msg : "Login excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao excluir login.'
      });
    }
  }
}
