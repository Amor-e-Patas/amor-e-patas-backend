exports.up = function (knex) {
	return knex.schema
		.createTable("db_post_assunto", function (table) {
			table.integer("id_post");
			table.foreign("id_post").references("db_post.id_post");
			table.integer("id_assunto");
            table.foreign("id_assunto").references("db_assunto.id_assunto");
			table.primary(['id_post', 'id_assunto']);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_post_assunto");
};

exports.config = { transaction: false };
