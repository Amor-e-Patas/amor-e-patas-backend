exports.up = function (knex) {
	return knex.schema
		.createTable("user", function (table) {
			table.increments("id");
			table.string("name", 255).notNullable();
			table.string("login", 255).notNullable();
			table.string("password", 255).notNullable();
		})

};

exports.down = function (knex) {
	return knex.schema
		.dropTable("user")
};

exports.config = { transaction: false };
