import { Request, Response } from 'express';
import db from '../database';

export default class VivenciaController {
  async index(req: Request, res: Response) {
    try {
      const assunto = await db('db_assunto')
        .select(
          'db_assunto.id_assunto',
          'db_assunto.nome_ass'
        );
      return res.status(200).json(assunto);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os assuntos.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    /*const {
      //role,
      id_usuario
     // id_login
    } = req.body.user;*/

    try {
      const assunto = await db('db_assunto')
        .select(
          'db_assunto.id_assunto',
          'db_assunto.nome_ass'
        )
        .where('db_assunto.id_assunto', id)
        ;
      return res.status(200).json(assunto[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o assunto.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_assunto,
        nome_ass
      } = req.body;

      const db_assunto = await trx('db_assunto').insert({ id_assunto, nome_ass });

      await trx.commit();
      return res.status(201).json({
        msg: "Assunto cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar assunto.'
      });
    }
  }
  async update(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {

      /*const {
        //role,
        id_usuario
       // id_login
      } = req.body.user;*/


      const {
        id_assunto,
        nome_ass
      } = req.body;



      const assunto = {
        id_assunto: id_assunto,
        nome_ass: nome_ass
      }

      await trx('db_assunto').update(assunto).where('id_assunto', id_assunto);

      await trx.commit();

      return res.status(201).json({
        msg: "Assunto atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar assunto.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_assunto').delete().where('id_assunto', id);
      await trx.commit();

      return res.status(201).json({
        msg: "Assunto excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover assunto.'
      });
    }
  }
}