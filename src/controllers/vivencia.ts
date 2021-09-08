import { Request, Response } from 'express';
import db from '../database';

export default class VivenciaController {
  async index(req: Request, res: Response) {
    try {
      const sexo = await db('db_vivencia')
        .select(
          'db_vivencia.id_vivencia',
          'db_vivencia.descricao'
        );
      return res.status(200).json(sexo);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar a vivência.'
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
      const vivencia = await db('db_vivencia')
        .select(
          'db_vivencia.id_vivencia',
          'db_vivencia.descricao'
        )
        .where('db_vivencia.id_vivencia', id)
        ;
      return res.status(200).json(vivencia[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar a vivência.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_vivencia,
        descricao
      } = req.body;

      const db_vivencia = await trx('db_vivencia').insert({ id_vivencia, descricao });

      await trx.commit();
      return res.status(201).json({
        msg: "Vivência cadastrada com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar vivência.'
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
        id_vivencia,
        descricao
      } = req.body;



      const vivencia = {
        id_vivencia: id_vivencia,
        descricao: descricao
      }

      await trx('db_vivencia').update(vivencia).where('id_vivencia', id_vivencia);

      await trx.commit();

      return res.status(201).json({
        msg: "vivencia atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar vivencia.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_vivencia').delete().where('id_vivencia', id);
      await trx.commit();

      return res.status(201).json({
        msg: "Vivência excluída com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover Vivência.'
      });
    }
  }
}