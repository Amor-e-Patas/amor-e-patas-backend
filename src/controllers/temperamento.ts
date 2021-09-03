import { Request, Response } from 'express';
import db from '../database';

export default class TemperamentoController {
  async index(req: Request, res: Response) {
    try {
      const sexo = await db('db_temperamento')
        .select(
          'db_temperamento.id_temperamento',
          'db_temperamento.descricao'
        );
      return res.status(200).json(sexo);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os temperamentos.'
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
      const temperamento = await db('db_temperamento')
        .select(
            'db_temperamento.id_temperamento',
            'db_temperamento.descricao'
        )
        .where('db_temperamento.id_temperamento', id)
        ;
      return res.status(200).json(temperamento[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o temperamento.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const {
        id_temperamento,
        descricao
      } = req.body;

      const db_login = await trx('db_temperamento').insert({id_temperamento, descricao});

      await trx.commit();
      return res.status(201).json({
        msg : "Temperamento cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar temperamento.'
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
        id_temperamento,
        descricao
      } = req.body;
      
     

      const temperamento = {
        id_temperamento: id_temperamento,
        descricao: descricao
      }
      
      await trx('db_temperamento').update(temperamento).where('id_temperamento', id_temperamento);

      await trx.commit();

      return res.status(201).json({
        msg : "Temperamento atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar temperamento.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_temperamento').delete().where('id_temperamento',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Temperamento excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao remover temperamento.'
      });
    }
  }
}