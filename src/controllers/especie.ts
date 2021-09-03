import { Request, Response } from 'express';
import db from '../database';

export default class EspecieController {
  async index(req: Request, res: Response) {
    try {
      const especies = await db('db_especie')
        .select(
          'db_especie.id_especie',
          'db_especie.nome_esp'
        );
      return res.status(200).json(especies);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar as espécies.'
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
      const especies = await db('db_especie')
        .select(
          'db_especie.id_especie',
          'db_especie.nome_esp'
        )
        .where('db_especie.id_especie', id)
        ;
      return res.status(200).json(especies[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar a espécie.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_especie,
        nome_esp
      } = req.body;

      const db_especie = await trx('db_especie').insert({id_especie, nome_esp});

      await trx.commit();
      return res.status(201).json({
        msg : "Espécie cadastrada com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar espécie.'
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
        id_especie,
        nome_esp
      } = req.body;
      
     

      const especie = {
        id_especie: id_especie,
        nome_esp: nome_esp
      }
      
      await trx('db_especie').update(especie).where('id_especie', id_especie);

      await trx.commit();

      return res.status(201).json({
        msg : "Espécie atualizada com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar espécie.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_especie').delete().where('id_especie',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Espécie excluída com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover espécie.'
      });
    }
  }
}
