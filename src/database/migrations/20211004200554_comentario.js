exports.up = function (knex) {
	return knex.schema
		.createTable("db_comentario", function (table) {
			table.increments("id_comentario");
			table.text("texto", "mediumtext");
            table.string("data");
			table.integer("id_usuario").unsigned();
			table.foreign("id_usuario").references("db_usuario.id_usuario");
            table.integer("id_post").unsigned();
			table.foreign("id_post").references("db_post.id_post");
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_comentario")
};

exports.config = { transaction: false };
