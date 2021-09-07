exports.up = function (knex) {
	return knex.schema
		.createTable("db_animal_soci", function (table) {
			table.integer("id_animal", 100);
			table.foreign("id_animal").references("db_animal.id_animal");
			table.integer("id_sociavel");
            table.foreign("id_sociavel").references("db_sociavel.id_sociavel");
			table.primary(['id_animal', 'id_sociavel']);
			
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_animal_soci")
};

exports.config = { transaction: false };