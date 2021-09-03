import { Request, Response } from 'express';
import db from '../database';

export default class PorteController {
  async index(req: Request, res: Response) {
    try {
      const sexo = await db('db_porte')
        .select(
          'db_porte.id_porte',
          'db_porte.tipo_porte',
          'db_porte.descricao'
        );
      return res.status(200).json(sexo);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os portes.'
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
      const porte = await db('db_porte')
        .select(
          'db_porte.id_porte',
          'db_porte.tipo_porte',
          'db_porte.descricao'
        )
        .where('db_porte.id_porte', id)
        ;
      return res.status(200).json(porte[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o porte.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_porte,
        tipo_porte,
        descricao
      } = req.body;

      const db_login = await trx('db_porte').insert({id_porte, tipo_porte, descricao});

      await trx.commit();
      return res.status(201).json({
        msg : "Porte cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar porte.'
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
        id_porte,
        tipo_porte,
        descricao
      } = req.body;
      
     

      const porte = {
        id_porte: id_porte,
        tipo_porte: tipo_porte,
        descricao: descricao
      }
      
      await trx('db_porte').update(porte).where('id_porte', id_porte);

      await trx.commit();

      return res.status(201).json({
        msg : "Porte atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar porte.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_porte').delete().where('id_porte',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Porte excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover porte.'
      });
    }
  }
}