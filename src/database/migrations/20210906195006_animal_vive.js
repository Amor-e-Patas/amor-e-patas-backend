exports.up = function (knex) {
	return knex.schema
		.createTable("db_animal_vive", function (table) {
			table.integer("id_animal", 100);
			table.foreign("id_animal").references("db_animal.id_animal");
			table.integer("id_vivencia");
            table.foreign("id_vivencia").references("db_vivencia.id_vivencia");
			table.primary(['id_animal', 'id_vivencia']);
			
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_animal_vive")
};

exports.config = { transaction: false };