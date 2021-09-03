import { Request, Response } from 'express';
import db from '../database';

export default class SexoController {
  async index(req: Request, res: Response) {
    try {
      const sexo = await db('db_sexo_animal')
        .select(
          'db_sexo_animal.id_sexo',
          'db_sexo_animal.tipo_sexo'
        );
      return res.status(200).json(sexo);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os sexos.'
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
      const sexo = await db('db_sexo_animal')
        .select(
            'db_sexo_animal.id_sexo',
            'db_sexo_animal.tipo_sexo'
        )
        .where('db_sexo_animal.id_sexo', id)
        ;
      return res.status(200).json(sexo[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o sexo.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_sexo,
        tipo_sexo
      } = req.body;

      const db_login = await trx('db_sexo_animal').insert({id_sexo, tipo_sexo});

      await trx.commit();
      return res.status(201).json({
        msg : "Sexo cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar sexo.'
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
        id_sexo,
        tipo_sexo
      } = req.body;
      
     

      const sexo = {
        id_sexo: id_sexo,
        tipo_sexo: tipo_sexo
      }
      
      await trx('db_sexo_animal').update(sexo).where('id_sexo', id_sexo);

      await trx.commit();

      return res.status(201).json({
        msg : "Sexo atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar sexo.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_sexo_animal').delete().where('id_sexo',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Sexo excluída com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover sexo.'
      });
    }
  }
}