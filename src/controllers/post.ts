import { Request, Response } from 'express';
import db from '../database/';

export default class PostController {
    async index(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const posts = await db('db_post')
                .join("db_usuario", "db_post.id_usuario", "db_usuario.id_usuario")

                .select(
                    'db_post.id_post',
                    'db_post.titulo',
                    'db_post.corpo',
                    'db_post.autor',
                    'db_post.data')
                .where('db_post.id_usuario', id_usuario)

            for (const assunto of posts) {
                const subject = await db('db_post_assunto')

                    .select(

                        '*'
                    )
                    .where('db_post_assunto.id_post', assunto.id_post);

                    assunto.assunto = subject;
            }

            for (const imagem of posts) {
                const imagens = await db('db_imagem_post')

                    .select(

                        '*'
                    )
                    .where('db_imagem_post.id_post', imagem.id_post);

                    imagem.images = imagens;
            }

            return res.status(200).json(posts);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os posts.'
            });
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const posts = await db('db_post')
                .join("db_imagem_post", "db_post.id_post", "db_imagem_post.id_post")

                .select(
                    'db_post.id_post',
                    'db_post.titulo',
                    'db_post.corpo',
                    'db_post.autor',
                    'db_post.data',
                    'db_imagem_post.filepath')

            for (const assunto of posts) {
                const subject = await db('db_post_assunto')

                    .select(

                        '*'
                    )
                    .where('db_post_assunto.id_post', assunto.id_post);

                    assunto.assunto = subject;
            }

            for (const imagem of posts) {
                const imagens = await db('db_imagem_post')

                    .select(

                        '*'
                    )
                    .where('db_imagem_post.id_post', imagem.id_post);

                    imagem.images = imagens;
            }

            return res.status(200).json(posts);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os posts.'
            });
        }
    }


    async show(req: Request, res: Response) {
        const { id_post } = req.params;

        const {
            //role,
            id_usuario
            // id_login
        } = req.body.user;

        try {

            const post = await db('db_post')
                .join("db_usuario", "db_post.id_usuario", "db_usuario.id_usuario")

                .select(
                    'db_post.id_post',
                    'db_post.titulo',
                    'db_post.corpo',
                    'db_post.autor',
                    'db_post.data')
                    .where('db_post.id_post', id_post);


            const assuntos = await db('db_post_assunto')
            .join("db_assunto", "db_post_assunto.id_assunto", "db_assunto.id_assunto")
                .select(

                    'db_post_assunto.id_assunto',
                    'db_assunto.nome_ass'
                )
                .where('db_post_assunto.id_post', id_post);

            post[0].assuntos = assuntos;

            for (const imagem of post) {
                const imagens = await db('db_imagem_post')

                    .select(

                        '*'
                    )
                    .where('db_imagem_post.id_post', imagem.id_post);

                    imagem.images = imagens;
            }

            return res.status(200).json(post[0]);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar o post.'
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
                titulo,
                corpo,
                autor,
                data,
                assuntos

            } = req.body;

            const [id_post] = await trx('db_post').insert({
                titulo,
                corpo,
                autor,
                data,
                id_usuario
            }
            ).returning('id_post');

            for (const assunto of assuntos) {
                await trx("db_post_assunto").insert(
                    {
                        id_post: id_post,
                        id_assunto: assunto
                    }
                );
            }

            await trx.commit();
            return res.status(201).json({
                msg: "Post cadastrado com sucesso.", id_post
            });

        } catch (err) {
            console.log(err);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao cadastrar post.'
            });
        }
    }
    async update(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const { id_post } = req.params;

            const {
                id_usuario
            } = req.body.user;


            const {
                titulo,
                corpo,
                autor,
                data,
                assuntos
            } = req.body;


            const post = {
                //id_usuario: id_usuario,
                titulo: titulo,
                corpo: corpo,
                autor: autor,
                data: data
            }

            await trx('db_post_assunto').delete().where('id_post', id_post);

            await trx('db_post').update(post).where('id_post', id_post);
            for (const id_assunto of assuntos) {
                await trx('db_post_assunto').insert(
                    {
                        id_assunto, id_post
                    }
                )
            }
            

            await trx.commit();
            return res.status(201).json({
                msg: "Post atualizado com sucesso."
            });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao atualizar post.'
            });
        }
    }

    async delete(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();
        const { id_post } = req.params;
        try {
           
            await trx('db_post_assunto').delete().where('id_post', id_post);
            await trx('db_post').delete().where('id_post', id_post);
            await trx.commit();

            return res.status(201).json({
                msg: "Post excluído com sucesso."
            });
        } catch (error) {
            await trx.rollback();
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao remover post.'
                
            });
        }
    }
}
