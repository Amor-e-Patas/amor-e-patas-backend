exports.up = function (knex) {
	return knex.schema
		.createTable("db_animal", function (table) {
			table.increments("id_animal");
			table.string("nome_ani", 45);
			table.string("idade", 45);
			table.string("cor", 45);
			table.string("caracteristica_animal", 600);
            table.string("data_nasc");
            table.string("desaparecido", 1);
			table.integer("id_usuario").unsigned();
			table.foreign("id_usuario").references("db_usuario.id_usuario");
			table.integer("id_porte").unsigned();
			table.foreign("id_porte").references("db_porte.id_porte");
			table.integer("id_especie").unsigned();
			table.foreign("id_especie").references("db_especie.id_especie");
            table.integer("id_sexo").unsigned();
			table.foreign("id_sexo").references("db_sexo_animal.id_sexo");
			table.integer("id_status").unsigned();
			table.foreign("id_status").references("db_status.id_status");
		})

};

exports.down = function (knex) {
	return knex.schema
		.dropTable("db_animal")
};

exports.config = { transaction: false };
