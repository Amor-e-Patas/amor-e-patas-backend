exports.up = function (knex) {
	return knex.schema
		.createTable("db_usuario", function (table) {
			table.increments("id_usuario");
			table.string("nome_usu", 100);
			table.string("cpf", 14);
			table.date("data_nasc");
			table.integer("id_telefone").unsigned();
			table.foreign("id_telefone").references("telefone.id_telefone");
			table.integer("id_endereco").unsigned();
			table.foreign("id_endereco").references("db_endereco.id_endereco");
		})

};

exports.down = function (knex) {
	return knex.schema
		.dropTable("db_usuario")
};

exports.config = { transaction: false };
