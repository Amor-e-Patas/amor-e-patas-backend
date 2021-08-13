import { Request, Response } from 'express';
import db from '../database/';

export default class UsersController {
  async index(req: Request, res: Response) {
    try {
      const users = await db('user')
        .select(
          'user.id',
          'user.name',
          'user.login',
          'user.password',
        );
      return res.status(200).json(users);

    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar os usuários.'
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      return res.status(200).json("Mostrando usuário de id " + id);
    } catch (err) {
      return res.status(400).json({
        error: 'Houve um erro ao listar o usuário.'
      });
    }

  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        login,
        password,
      } = req.body;
    return res.status(200).json(`Criando usuário com nome = ${name} login = ${login} password = ${password}`);
    } catch (err) {
      return res.status(400).json({
        error: 'Erro ao cadastrar usuário.'
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        id,
        name,
        login,
        password,
        idUserType,
      } = req.body;

      return res.status(200).json(`Atualizando usuário do id ${id} com os dados login = ${login} nome = ${name} password = ${password}`)
    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao atualizar usuário.'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.status(200).json("Deletando usuário de id " + id);
    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao remover usuário.'
      });
    }
  }
}
