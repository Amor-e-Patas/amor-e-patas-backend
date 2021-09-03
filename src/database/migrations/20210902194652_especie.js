exports.up = function (knex) {
	return knex.schema
		.createTable("db_especie", function (table) {
			table.increments("id_especie");
			table.string("nome_esp", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_especie")
};

exports.config = { transaction: false };
