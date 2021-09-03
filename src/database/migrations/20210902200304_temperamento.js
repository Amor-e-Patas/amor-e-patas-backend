exports.up = function (knex) {
	return knex.schema
		.createTable("db_temperamento", function (table) {
			table.increments("id_temperamento");
            table.string("descricao", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_temperamento")
};

exports.config = { transaction: false };
