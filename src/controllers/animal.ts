import { Request, Response } from 'express';
import db from '../database/';

export default class AnimalController {
    async index(req: Request, res: Response) {
        try {
            const animal = await db('db_animal')
                .join("db_usuario", "db_animal.id_usuario", "db_usuario.id_usuario")
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo", "db_animal.id_sexo", "db_sexo.id_sexo")

                .select(
                    'db_animal.id_animal',
                    'db_animal.nome_ani',
                    'db_animal.idade',
                    'db_animal.cor',
                    'db_animal.caracteristica_animal',
                    'db_animal.data_nasc',
                    'db_animal.desaparecido',
                    'db_animal.id_usuario',
                    'db_animal.id_porte',
                    'db_animal.id_especie',
                    'db_animal.id_sexo'
                );
            return res.status(200).json(animal);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async show(req: Request, res: Response) {
        //const { id } = req.params;

        const {
            //role,
            id_usuario
            // id_login
        } = req.body.user;

        try {
            const animal = await db('db_animal')
                .join("db_usuario", "db_animal.id_usuario", "db_usuario.id_usuario")
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo", "db_animal.id_sexo", "db_sexo.id_sexo")

                .select(
                    'db_animal.id_animal',
                    'db_animal.nome_ani',
                    'db_animal.idade',
                    'db_animal.cor',
                    'db_animal.caracteristica_animal',
                    'db_animal.data_nasc',
                    'db_animal.desaparecido',
                    'db_animal.id_usuario',
                    'db_animal.id_porte',
                    'db_animal.id_especie',
                    'db_animal.id_sexo'
                )
                .where('db_animal.id_usuario', id_usuario)
                ;
            return res.status(200).json(animal[0]);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar o animal.'
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
                nome_ani,
                idade,
                cor,
                caracteristica_animal,
                data_nasc,
                desaparecido,
                id_porte,
                id_especie,
                id_sexo,
                temperamentos

            } = req.body;

            const [id_animal] = await trx('db_animal').insert({
                nome_ani,
                idade,
                cor,
                caracteristica_animal,
                data_nasc,
                desaparecido,
                id_usuario,
                id_porte,
                id_especie,
                id_sexo
            }
            ).returning('id_animal');

            for (const temperamento of temperamentos) {
                await trx("db_animal_temp").insert(
                    {id_temperamento: temperamento,
                    id_animal: id_animal}
                   );
            }

            await trx.commit();
            return res.status(201).json({
                msg: "Animal cadastrado com sucesso."
            });

        } catch (err) {
            console.log(err);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao cadastrar animal.'
            });
        }
    }
    async update(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const {
                id_usuario
            } = req.body.user;


            const {
                nome_ani,
                idade,
                cor,
                caracteristica_animal,
                data_nasc,
                desaparecido,
                //id_porte,
                //id_especie,
                //id_sexo
            } = req.body;



            const animal = {
                //id_usuario: id_usuario,
                nome_ani: nome_ani,
                idade: idade,
                cor: cor,
                caracteristica_animal: caracteristica_animal,
                data_nasc: data_nasc,
                desaparecido: desaparecido
            }
            console.log(id_usuario);

            await trx('db_animal').update(animal).where('id_usuario', id_usuario);

            await trx.commit();

            return res.status(201).json({
                msg: "Animal atualizado com sucesso."
            });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao atualizar animal.'
            });
        }
    }

    async delete(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();
        try {
            const { id } = req.body.user;
            await trx('db_animal').delete().where('id_usuario', id);
            await trx.commit();

            return res.status(201).json({
                msg: "Animal excluído com sucesso."
            });
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao remover animal.'
            });
        }
    }
}