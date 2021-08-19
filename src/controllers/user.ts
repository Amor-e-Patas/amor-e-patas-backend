import { Request, Response } from 'express';
import db from '../database/';

export default class UsersController {
  async index(req: Request, res: Response) {
    try {
      const users = await db('db_usuario')
        .select(
          'db_usuario.id_usuario',
          'db_usuario.nome_usu',
          'db_usuario.cpf',
          'db_usuario.data_nasc',
        );
      return res.status(200).json(users);

    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar os usuários.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const users = await db('db_usuario')
        .select(
          'db_usuario.id_usuario',
          'db_usuario.nome_usu',
          'db_usuario.cpf',
          'db_usuario.data_nasc'
        )
        .where('db_usuario.id_usuario', id)
        ;
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o usuário.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        nome_usu,
        cpf,
        data_nasc
      } = req.body;

      const user = await trx('db_usuario').insert({ nome_usu, cpf, data_nasc});

      await trx.commit();
      return res.status(201).json({
        msg : "Usuário cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar usuário.'
      });
    }
  }
  async update(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_usuario,
        nome_usu,
        cpf,
        data_nasc
      } = req.body;
      
      const user = {
        id_usuario: id_usuario,
        nome_usu: nome_usu,
        cpf: cpf,
        data_nasc: data_nasc
      }

      await trx('db_usuario').update(user).where('id_usuario', id_usuario);

      await trx.commit();

      return res.status(201).json({
        msg : "Usuário atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar usuário.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_usuario').delete().where('id_usuario',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Usuário excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover usuário.'
      });
    }
  }
}
