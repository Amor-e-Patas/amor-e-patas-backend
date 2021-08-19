
exports.up = function(knex) {
    return knex.schema
		.createTable("db_telefone", function(table){
			table.increments("id_telefone");
			table.string("num_telefone", 11);
		})
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("db_usuario")
		.dropTable("db_telefone")
};

exports.config = { transaction: false };