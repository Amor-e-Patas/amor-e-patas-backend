
exports.up = function (knex) {
	return knex.schema
		.createTable("db_login", function (table) {
			table.increments("id_login");
			table.string("email", 100).notNullable().unique();
			table.string("senha", 45);
			table.string("role", 50);
		})

};

exports.down = function (knex) {
	return knex.schema
	.dropTable("db_usuario")
    .dropTable("db_login")
};

exports.config = { transaction: false };
