exports.up = function (knex) {
	return knex.schema
		.createTable("db_sociavel", function (table) {
			table.increments("id_sociavel");
            table.string("descricao", 45);
		})

};

exports.down = function (knex) {
	return knex.schema
	    .dropTable("db_sociavel")
};

exports.config = { transaction: false };
