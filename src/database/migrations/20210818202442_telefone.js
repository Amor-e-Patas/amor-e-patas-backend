
exports.up = function(knex) {
    return knex.schema
		.createTable("telefone", function(table){
			table.increments("id_telefone");
			table.string("num_telefone", 11);
		})
  
};

exports.down = function(knex) {
    return knex.schema
		.dropTable("telefone")
};

exports.config = { transaction: false };