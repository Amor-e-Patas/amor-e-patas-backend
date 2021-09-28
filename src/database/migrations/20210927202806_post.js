exports.up = function (knex) {
	return knex.schema
		.createTable("db_post", function (table) {
			table.increments("id_post", 200);
			table.string("titulo", 200);
			table.text("corpo", "mediumtext");
			table.string("autor", 45);
			table.string("data");
			table.integer("id_usuario").unsigned();
			table.foreign("id_usuario").references("db_usuario.id_usuario");
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_post");
};

exports.config = { transaction: false };
