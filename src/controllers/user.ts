import { Request, Response } from 'express';
import db from '../database/';

export default class UsersController {
  async index(req: Request, res: Response) {
    try {
      const users = await db('db_usuario')
      .join("db_endereco", "db_usuario.id_endereco", "db_endereco.id_endereco")
      .join("db_telefone", "db_usuario.id_telefone", "db_telefone.id_telefone")
      .join("db_login", "db_usuario.id_login", "db_login.id_login")
      
        .select(
          'db_usuario.id_usuario',
          'db_usuario.nome_usu',
          'db_usuario.cpf',
          'db_usuario.data_nasc',
          'db_usuario.genero',
          'db_endereco.cep',
          'db_endereco.bairro',
          'db_endereco.endereco',
          'db_endereco.numero',
          'db_endereco.referencia',
          'db_endereco.estado',
          'db_endereco.cidade',
          'db_telefone.num_telefone',
          'db_login.email',
          'db_login.senha'
        );
      return res.status(200).json(users);

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Houve um erro ao listar os usuários.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const users = await db('db_usuario')
      .join("db_endereco", "db_usuario.id_endereco", "db_endereco.id_endereco")
      .join("db_telefone", "db_usuario.id_telefone", "db_telefone.id_telefone")
      .join("db_login", "db_usuario.id_login", "db_login.id_login")
        .select(
          'db_usuario.id_usuario',
          'db_usuario.nome_usu',
          'db_usuario.cpf',
          'db_usuario.data_nasc',
          'db_usuario.genero',
          'db_endereco.cep',
          'db_endereco.bairro',
          'db_endereco.endereco',
          'db_endereco.numero',
          'db_endereco.referencia',
          'db_endereco.estado',
          'db_endereco.cidade',
          'db_telefone.num_telefone',
          'db_login.email',
          'db_login.senha'
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
      const [id_login] = await trx("db_login").insert(
        req.body.login
       ).returning('id_login');

       const [id_endereco] = await trx("db_endereco").insert(
        req.body.endereco
       ).returning('id_endereco');

       const [id_telefone] = await trx("db_telefone").insert(
        req.body.telefone
       ).returning('id_telefone');
       
      const {
        nome_usu,
        cpf,
        data_nasc,
        genero
      } = req.body;

      const user = await trx('db_usuario').insert({
        nome_usu,
        cpf,
        data_nasc,
        genero,
        id_login,
        id_endereco,
        id_telefone}
      );

      await trx.commit();
      return res.status(201).json({
        msg : "Usuário cadastrado com sucesso."
      });

    } catch (err) {
      console.log(err);
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
        data_nasc,
        genero
      } = req.body;
      
      const user = {
        id_usuario: id_usuario,
        nome_usu: nome_usu,
        cpf: cpf,
        data_nasc: data_nasc,
        genero: genero
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
