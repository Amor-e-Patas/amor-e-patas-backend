
exports.up = function (knex) {
	return knex.schema
		.createTable("db_login", function (table) {
			table.string("email", 100);
			table.string("senha", 45);
			
		})

};

exports.down = function (knex) {
	return knex.schema
	.dropTable("db_usuario")
    .dropTable("db_login")
};

exports.config = { transaction: false };
