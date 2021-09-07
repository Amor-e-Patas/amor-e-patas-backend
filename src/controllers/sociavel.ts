import { Request, Response } from 'express';
import db from '../database';

export default class SociavelController {
  async index(req: Request, res: Response) {
    try {
      const sexo = await db('db_sociavel')
        .select(
          'db_sociavel.id_sociavel',
          'db_sociavel.descricao'
        );
      return res.status(200).json(sexo);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar a sociabilidade.'
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
      const sociavel = await db('db_sociavel')
        .select(
            'db_sociavel.id_sociavel',
            'db_sociavel.descricao'
        )
        .where('db_sociavel.id_sociavel', id)
        ;
      return res.status(200).json(sociavel[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar a sociabilidade.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_sociavel,
        descricao
      } = req.body;

      const db_sociavel = await trx('db_sociavel').insert({id_sociavel, descricao});

      await trx.commit();
      return res.status(201).json({
        msg : "Sociabilidade cadastrada com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar sociabilidade.'
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
        id_sociavel,
        descricao
      } = req.body;
      
     

      const sociavel = {
        id_sociavel: id_sociavel,
        descricao: descricao
      }
      
      await trx('db_sociavel').update(sociavel).where('id_temperamento', id_sociavel);

      await trx.commit();

      return res.status(201).json({
        msg : "Sociabilidade atualizada com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar sociabilidade.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_sociavel').delete().where('id_sociavel',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Sociabilidade excluída com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover sociabilidade.'
      });
    }
  }
}