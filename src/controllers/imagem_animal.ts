import { Request, Response } from 'express';
import db from '../database';
import path from 'path';

export default class ImgAniControllers {
    async index(req: Request, res: Response) {
        try {
            const imagens = await db('db_imagem_animal')
                .select(
                    'db_imagem_animal.id_imagem',
                    'db_imagem_animal.filename',
                    'db_imagem_animal.filepath',
                    'db_imagem_animal.mimetype',
                    'db_imagem_animal.size'
                );
            return res.status(200).json(imagens);

        } catch (err) {
            return res.status(400).json({
                error: 'Houve um erro ao listar a imagem.'
            });
        }
    }

    async show(req: Request, res: Response) {

        const { filename } = req.params;

        try {
                const { filename } = req.params;
                const dirname = path.resolve();
                const fullfilepath = path.join(dirname, 'images/' + filename);
                return res.sendFile(fullfilepath);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar a imagem.'
            });
        }
    }

    async create(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const files = req.files as Array<Express.Multer.File>;

            for (const file of files) {
                const db_imagem_animal = await trx('db_imagem_animal').insert({ filename: file.filename, filepath: file.path.replace("\\", "/"), mimetype: file.mimetype, size: file.size, id_animal: req.body.id_animal });
            }

            await trx.commit();
            return res.status(201).json({
                msg: "Imagem enviada com sucesso."
            });

        } catch (err) {
            console.log(err);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao enviar imagem.'
            });
        }
    }
    async update(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const { id_animal } = req.params;

            const {
                id_imagem,
                filename,
                filepath,
                mimetype,
                size
            } = req.body;

            const db_imagem_animal = {
                id_imagem: id_imagem,
                filename: filename,
                filepath: filepath,
                mimetype: mimetype,
                size: size
            }

            await trx('db_imagem_animal').update(db_imagem_animal).where('id_animal', id_animal);

            await trx.commit();

            return res.status(201).json({
                msg: "Img atualizada com sucesso."
            });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao atualizar img.'
            });
        }
    }

    async delete(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();
        try {
            const { id } = req.params;
            await trx('db_imagem_animal').delete().where('id_imagem', id);
            await trx.commit();

            return res.status(201).json({
                msg: "Img exclu??da com sucesso."
            });
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao excluir img.'
            });
        }
    }
}
