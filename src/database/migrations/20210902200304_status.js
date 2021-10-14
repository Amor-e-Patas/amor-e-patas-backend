exports.up = function (knex) {
	return knex.schema
		.createTable("db_status", function (table) {
			table.increments("id_status");
			table.string("descricao", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_status");
};

exports.config = { transaction: false };
