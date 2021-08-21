exports.up = function (knex) {
	return knex.schema
		.createTable("db_usuario", function (table) {
			table.increments("id_usuario");
			table.string("nome_usu", 100);
			table.string("cpf", 14);
			table.date("data_nasc");
			table.string("genero");
			table.integer("id_telefone").unsigned();
			table.foreign("id_telefone").references("db_telefone.id_telefone");
			table.integer("id_endereco").unsigned();
			table.foreign("id_endereco").references("db_endereco.id_endereco");
			table.integer("id_login").unsigned();
			table.foreign("id_login").references("db_login.id_login");
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_telefone")
		.dropTable("db_endereco")
		.dropTable("db_usuario")
};

exports.config = { transaction: false };
