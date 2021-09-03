exports.up = function (knex) {
	return knex.schema
		.createTable("db_porte", function (table) {
			table.increments("id_porte");
			table.string("tipo_porte", 45);
            table.string("descricao", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_porte")
};

exports.config = { transaction: false };
