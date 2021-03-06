import { Request, Response } from 'express';
import db from '../database/';

export default class AnimalController {
    async index(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "N");

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexAprovados(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "N")
                .where('db_status.id_status', "1");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexAprovadosNormais(req: Request, res: Response) {
        try {

            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "1")
                .where('db_animal.desaparecido', "N");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexAprovadosDesaparecidos(req: Request, res: Response) {
        try {
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "1")
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexReprovadosNormais(req: Request, res: Response) {
        try {
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "2")
                .where('db_animal.desaparecido', "N");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexReprovadosDesaparecidos(req: Request, res: Response) {
        try {
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "2")
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexEmAnaliseNormais(req: Request, res: Response) {
        try {
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "3")
                .where('db_animal.desaparecido', "N");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexEmAnaliseDesaparecidos(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "3")
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexEmAnaliseDesaparecidos2(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "3")
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexDesaparecidosDesa(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "2")
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexAllDesaparecidos(req: Request, res: Response) {
        try {
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.descricao')
                .where('db_status.id_status', "1")
                .where('db_animal.desaparecido', "S");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexDesaparecidos(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status')
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "S")
                .where('db_status.id_status', "1");
            console.log(animals, "animais desaparecidos");

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexNegados(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status')
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "N")
                .where('db_status.id_status', "2");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexEmAnalise(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status')
                .where('db_animal.desaparecido', "N")
                .where('db_status.id_status', "3");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async indexEmAnalise2(req: Request, res: Response) {
        try {
            const {
                //role,
                id_usuario
                // id_login
            } = req.body.user;
            const animals = await db('db_animal')
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")

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
                    'db_animal.id_sexo',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status')
                .where('db_animal.id_usuario', id_usuario)
                .where('db_animal.desaparecido', "N")
                .where('db_status.id_status', "3");
            console.log(animals);

            for (const animal of animals) {
                const imagens = await db('db_imagem_animal')

                    .select(

                        '*'
                    )
                    .where('db_imagem_animal.id_animal', animal.id_animal);

                animal.images = imagens;
            }

            return res.status(200).json(animals);

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar os animais.'
            });
        }
    }

    async show(req: Request, res: Response) {
        const { id_animal } = req.params;

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
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")
                .join("db_endereco", "db_usuario.id_endereco", "db_endereco.id_endereco")
                .join("db_telefone", "db_usuario.id_telefone", "db_telefone.id_telefone")

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
                    'db_animal.id_sexo',
                    'db_usuario.nome_usu',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status',
                    'db_usuario.nome_usu',
                    'db_endereco.estado',
                    'db_endereco.cidade',
                    'db_telefone.num_telefone')
                .where('db_animal.id_animal', id_animal);

            const imagens = await db('db_imagem_animal')

                .select(

                    'db_imagem_animal.filepath',
                    'db_imagem_animal.id_imagem'
                )
                .where('db_imagem_animal.id_animal', id_animal);

            animal[0].images = imagens;

            const temperamentos = await db('db_animal_temp')
                .join("db_temperamento", "db_animal_temp.id_temperamento", "db_temperamento.id_temperamento")
                .select(

                    'db_animal_temp.id_temperamento',
                    'db_temperamento.descricao'
                )
                .where('db_animal_temp.id_animal', id_animal);

            animal[0].temperamentos = temperamentos;

            const sociaveis = await db('db_animal_soci')
                .join("db_sociavel", "db_animal_soci.id_sociavel", "db_sociavel.id_sociavel")
                .select(

                    'db_animal_soci.id_sociavel',
                    'db_sociavel.descricao'
                )
                .where('db_animal_soci.id_animal', id_animal);

            animal[0].sociaveis = sociaveis;

            const vivencias = await db('db_animal_vive')
                .join("db_vivencia", "db_animal_vive.id_vivencia", "db_vivencia.id_vivencia")
                .select(

                    'db_animal_vive.id_vivencia',
                    'db_vivencia.descricao'
                )
                .where('db_animal_vive.id_animal', id_animal);

            animal[0].vivencias = vivencias;

            console.log(id_usuario);

            return res.status(200).json(animal[0]);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Houve um erro ao listar o animal.'
            });
        }
    }

    async showIndex(req: Request, res: Response) {
        const { id_animal } = req.params;

        try {

            const animal = await db('db_animal')
                .join("db_usuario", "db_animal.id_usuario", "db_usuario.id_usuario")
                .join("db_porte", "db_animal.id_porte", "db_porte.id_porte")
                .join("db_especie", "db_animal.id_especie", "db_especie.id_especie")
                .join("db_sexo_animal", "db_animal.id_sexo", "db_sexo_animal.id_sexo")
                .join("db_status", "db_animal.id_status", "db_status.id_status")
                .join("db_endereco", "db_usuario.id_endereco", "db_endereco.id_endereco")
                .join("db_telefone", "db_usuario.id_telefone", "db_telefone.id_telefone")

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
                    'db_animal.id_sexo',
                    'db_usuario.nome_usu',
                    'db_porte.tipo_porte',
                    'db_especie.nome_esp',
                    'db_sexo_animal.tipo_sexo',
                    'db_status.id_status',
                    'db_usuario.nome_usu',
                    'db_endereco.estado',
                    'db_endereco.cidade',
                    'db_telefone.num_telefone')
                .where('db_animal.id_animal', id_animal);

            const imagens = await db('db_imagem_animal')

                .select(

                    'db_imagem_animal.filepath'
                )
                .where('db_imagem_animal.id_animal', id_animal);

            animal[0].images = imagens;

            const temperamentos = await db('db_animal_temp')
                .join("db_temperamento", "db_animal_temp.id_temperamento", "db_temperamento.id_temperamento")
                .select(

                    'db_animal_temp.id_temperamento',
                    'db_temperamento.descricao'
                )
                .where('db_animal_temp.id_animal', id_animal);

            animal[0].temperamentos = temperamentos;

            const sociaveis = await db('db_animal_soci')
                .join("db_sociavel", "db_animal_soci.id_sociavel", "db_sociavel.id_sociavel")
                .select(

                    'db_animal_soci.id_sociavel',
                    'db_sociavel.descricao'
                )
                .where('db_animal_soci.id_animal', id_animal);

            animal[0].sociaveis = sociaveis;

            const vivencias = await db('db_animal_vive')
                .join("db_vivencia", "db_animal_vive.id_vivencia", "db_vivencia.id_vivencia")
                .select(

                    'db_animal_vive.id_vivencia',
                    'db_vivencia.descricao'
                )
                .where('db_animal_vive.id_animal', id_animal);

            animal[0].vivencias = vivencias;

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
                id_status,
                temperamentos,
                sociaveis,
                vivencias

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
                id_sexo,
                id_status
            }
            ).returning('id_animal');
            console.log(id_animal, 'idddddd');
            for (const temperamento of temperamentos) {
                await trx("db_animal_temp").insert(
                    {
                        id_temperamento: temperamento,
                        id_animal: id_animal
                    }
                );
            }
            console.log(sociaveis, 'sociaveis');
            for (const sociavel of sociaveis) {
                await trx("db_animal_soci").insert(
                    {
                        id_sociavel: sociavel,
                        id_animal: id_animal
                    }
                );
            }
            for (const vivencia of vivencias) {
                await trx("db_animal_vive").insert(
                    {
                        id_vivencia: vivencia,
                        id_animal: id_animal
                    }
                );
            }

            await trx.commit();
            return res.status(201).json({
                msg: "Animal cadastrado com sucesso.", id_animal
            });

        } catch (err) {
            console.log(err);
            await trx.rollback();
            return res.status(400).json({
                error: 'Erro ao cadastrar animal.'
            });
        }
    }

    async updateStatus(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const { id_animal } = req.params;

            const {
                id_usuario
            } = req.body.user;


            const {
                id_status

            } = req.body;
            console.log('hsdjsdk')

            await trx('db_animal').update({ id_status }).where('id_animal', id_animal);

            const animal = {
                id_status: id_status
            }


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

    async update(req: Request, res: Response) {
        const trxProvider = await db.transactionProvider();
        const trx = await trxProvider();

        try {

            const { id_animal } = req.params;

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
                id_status,
                selectTemps,
                selectVives,
                selectSocis,
                imagesToRemove
            } = req.body;

            const animal = {
                //id_usuario: id_usuario,
                nome_ani: nome_ani,
                idade: idade,
                cor: cor,
                caracteristica_animal: caracteristica_animal,
                data_nasc: data_nasc,
                desaparecido: desaparecido,
                id_porte: id_porte,
                id_especie: id_especie,
                id_sexo: id_sexo,
                id_status: id_status
            }
            await trx('db_animal').update(animal).where('id_animal', id_animal);
            await trx('db_animal_temp').delete().where('id_animal', id_animal);
            if (imagesToRemove) {
                for (const id_imagem of imagesToRemove) {
                    await trx('db_imagem_animal').delete().where('id_imagem', id_imagem);
                }
            } else {
                await trx('db_imagem_animal').delete().where('id_animal', id_animal);
            }

            await trx('db_animal_temp').delete().where('id_animal', id_animal);
            for (const id_temperamento of selectTemps) {
                await trx('db_animal_temp').insert(
                    {
                        id_temperamento, id_animal
                    }
                )
            }

            await trx('db_animal_vive').delete().where('id_animal', id_animal);
            for (const id_vivencia of selectVives) {
                await trx('db_animal_vive').insert(
                    {
                        id_vivencia, id_animal
                    }
                )
            }

            await trx('db_animal_soci').delete().where('id_animal', id_animal);
            for (const id_sociavel of selectSocis) {
                await trx('db_animal_soci').insert(
                    {
                        id_sociavel, id_animal
                    }
                )
            }

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
        const { id_animal } = req.params;
        console.log(req.body.data, 'bodyyyyyyyyyyyyy');
        try {
             await trx('db_animal_temp').delete().where('id_animal', id_animal);
            await trx('db_animal_soci').delete().where('id_animal', id_animal);
            await trx('db_animal_vive').delete().where('id_animal', id_animal);
            await trx('db_imagem_animal').delete().where('id_animal', id_animal);
            await trx('db_animal').delete().where('id_animal', id_animal);
            await trx.commit();
            return res.status(201).json({
                msg: "Animal exclu??do com sucesso."
            });
        } catch (error) {
            await trx.rollback();
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao remover animal.'

            });
        }
    }

}
