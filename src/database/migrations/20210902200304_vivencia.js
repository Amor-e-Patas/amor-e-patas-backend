exports.up = function (knex) {
	return knex.schema
		.createTable("db_vivencia", function (table) {
			table.increments("id_vivencia");
            table.string("descricao", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_vivencia")
};

exports.config = { transaction: false };
