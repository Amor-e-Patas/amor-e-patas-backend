import { Request, Response } from 'express';
import db from '../database';

export default class EnderecoControllers {
  async index(req: Request, res: Response) {
    try {
      const enderecos = await db('db_endereco')
        .select(
          'db_endereco.id_endereco',
          'db_endereco.cep',
          'db_endereco.bairro',
          'db_endereco.endereco',
          'db_endereco.numero',
          'db_endereco.referencia',
          'db_endereco.estado',
          'db_endereco.cidade'
        );
      return res.status(200).json(enderecos);

    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar o endereço.'
      });
    }
  }

  async show(req: Request, res: Response) {

    //const { id } = req.params;

    const {
      //role,
      id_endereco
     // id_login
    } = req.body.user;

    try {
      const endereco = await db('db_endereco')
        .select(
          'db_endereco.id_endereco',
          'db_endereco.cep',
          'db_endereco.bairro',
          'db_endereco.endereco',
          'db_endereco.numero',
          'db_endereco.referencia',
          'db_endereco.estado',
          'db_endereco.cidade'
        )
        .where('db_endereco.id_endereco', id_endereco)
        ;
      return res.status(200).json(endereco[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar o endereço.'
      });
    }
  }

  async create(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {

      const {
        //role,
        id_endereco
       // id_login
      } = req.body.user;

      const {
        //id_endereco,
        cep,
        bairro,
        endereco,
        numero,
        referencia,
        estado,
        cidade
      } = req.body;

      const db_endereco = await trx('db_endereco').insert({id_endereco,cep,bairro,endereco,numero,referencia,estado,cidade});

      await trx.commit();
      return res.status(201).json({
        msg : "Endereço cadastrado com sucesso."
      });

    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao cadastrar endereço.'
      });
    }
  }
  async update(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {

      const {
        //role,
        id_endereco
       // id_login
      } = req.body.user;

      console.log(id_endereco);

      const {
        //id_endereco,
        cep,
        bairro,
        endereco,
        numero,
        referencia,
        estado,
        cidade
      } = req.body;
      
      const db_endereco = {
        //id_endereco: id_endereco,
        cep: cep,
        bairro: bairro,
        endereco: endereco,
        numero: numero,
        referencia: referencia,
        estado: estado,
        cidade: cidade
      }

      await trx('db_endereco').update(db_endereco).where('id_endereco', id_endereco);

      await trx.commit();

      return res.status(201).json({
        msg : "Endereço atualizado com sucesso."
      });

    } catch (error) {
      console.log(error);
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao atualizar endereço.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      const { id } = req.params;
      await trx('db_endereco').delete().where('id_endereco',id);
      await trx.commit();

      return res.status(201).json({
        msg : "Endereço excluído com sucesso."
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro ao excluir endereço.'
      });
    }
  }
}
