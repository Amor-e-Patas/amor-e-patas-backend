import { Request, Response } from 'express';
import db from '../database';

export default class TelefoneControllers {
  async index(req: Request, res: Response) {
    try {
      const users = await db('telefone')
        .select(
          'telefone.id_telefone',
          'telefone.num_telefone',
        );
      return res.status(200).json(users);

    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar os telefones.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const telefones = await db('db_telefone')
        .select(
          'db_telefone.id_telefone',
          'db_telefone.num_telefone',
        )
        .where('db_telefone.id_telefone', id)
        ;
      return res.status(200).json(telefones);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o telefone.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_telefone,
        num_telefone
      } = req.body;

      const telefone = await trx('db_telefone').insert({id_telefone, num_telefone});

      await trx.commit();
      return res.status(201).json({
        msg : "Telefone cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar telefone.'
      });
    }
  }
  async update(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_telefone,
        num_telefone
      } = req.body;
      
      const telefone = {
        id_telefone: id_telefone,
        num_telefone: num_telefone
      }

      await trx('db_telefone').update(telefone).where('id_telefone', id_telefone);

      await trx.commit();

      return res.status(201).json({
        msg : "Telefone atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar telefone.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_telefone').delete().where('id_telefone',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Telefone excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover telefone.'
      });
    }
  }
}
