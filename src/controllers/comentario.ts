import { Request, Response } from 'express';
import db from '../database';

export default class ComentarioController {
    async index(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const comentario = await db('db_comentario')
                .join("db_usuario", "db_comentario.id_usuario", "db_usuario.id_usuario")
                .select(
                    'db_comentario.*',
                    'db_usuario.nome_usu'
                )
                .where('db_comentario.id_post', id);
            return res.status(200).json(comentario);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os comentarios.'
            });
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const { id_usuario, role } = req.body.user
        try {

            const comentario = await db('db_comentario')
                .join("db_usuario", "db_comentario.id_usuario", "db_usuario.id_usuario")
                .select(
                    'db_comentario.*',
                    'db_usuario.nome_usu',
                    'db_comentario.id_usuario'
                )
                .where('db_comentario.id_comentario', id);
            if (id_usuario == comentario[0].id_usuario || role == "admin") {
                return res.status(200).json(comentario[0]);
            }
            return res.status(401).send();
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar o comentario.'
            });
        }
    }

    async create(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {
            const {
                id_usuario
            } = req.body.user;

            const {
                texto,
                data,
                id_post
            } = req.body;

            const db_comentario = await trx('db_comentario').insert({ texto, data, id_usuario, id_post });

            await trx.commit();
            return res.status(201).json({
                msg: "Comentário cadastrado com sucesso."
            });

        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao cadastrar comentário.'
            });
        }
    }
    async update(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const {
                texto,
                id_comentario,
                data
            } = req.body;



            const comentario = {
                texto: texto,
                data: data
            }

            await trx('db_comentario').update(comentario).where('id_comentario', id_comentario);

            await trx.commit();

            return res.status(201).json({
                msg: "Comentario atualizado com sucesso."
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
            await trx('db_comentario').delete().where('id_comentario', id);
            await trx.commit();

            return res.status(201).json({
                msg: "Comentario excluído com sucesso."
            });
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao remover comentario.'
            });
        }
    }
}