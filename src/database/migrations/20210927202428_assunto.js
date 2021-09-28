
exports.up = function (knex) {
	return knex.schema
		.createTable("db_assunto", function (table) {
			table.increments("id_assunto");
			table.string("nome_ass", 45);
			
		})

};

exports.down = function (knex) {
	return knex.schema
	.dropTable("db_assunto")
};

exports.config = { transaction: false };
