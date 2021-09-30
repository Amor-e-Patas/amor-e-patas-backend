exports.up = function (knex) {
	return knex.schema
		.createTable("db_imagem_post", function (table) {
			table.increments("id_imagem");
			table.string("filename", 4000).notNullable().unique();
            table.string("filepath", 4000);
            table.string("mimetype", 100);
            table.integer("size");
			table.integer("id_post").unsigned();
			table.foreign("id_post").references("db_post.id_post");
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_imagem_post")
};

exports.config = { transaction: false };
