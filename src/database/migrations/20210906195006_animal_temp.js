exports.up = function (knex) {
	return knex.schema
		.createTable("db_animal_temp", function (table) {
			table.integer("id_animal", 100);
			table.foreign("id_animal").references("db_animal.id_animal");
			table.integer("id_temperamento");
            table.foreign("id_temperamento").references("db_temperamento.id_temperamento");
			table.primary(['id_animal', 'id_temperamento']);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_animal_temp")
};

exports.config = { transaction: false };