exports.up = function (knex) {
	return knex.schema
		.createTable("db_imagem_animal", function (table) {
			table.increments("id_imagem");
			table.string("filename", 4000).notNullable().unique();
            table.string("filepath", 4000);
            table.string("mimetype", 100);
            table.integer("size");
			table.integer("id_animal").unsigned();
			table.foreign("id_animal").references("db_animal.id_animal");
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_imagem_animal")
};

exports.config = { transaction: false };
