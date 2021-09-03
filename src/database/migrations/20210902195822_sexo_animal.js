exports.up = function (knex) {
	return knex.schema
		.createTable("db_sexo_animal", function (table) {
			table.increments("id_sexo");
			table.string("tipo_sexo", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_sexo_animal")
};

exports.config = { transaction: false };
