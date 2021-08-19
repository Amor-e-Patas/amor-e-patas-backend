
exports.up = function(knex) {
	return knex.schema
		.createTable("db_endereco", function (table) {
			table.increments("id_endereco");
			table.string("cep", 10);
			table.string("bairro", 45);
			table.string("endereco", 200);
			table.string("numero", 20);
			table.string("referencia", 45)
            table.string("estado", 45);
            table.string("cidade", 100);
		})

};

exports.down = function(knex) {
    return knex.schema
	.dropTable("db_usuario")
    .dropTable("db_endereco")
};

exports.config = { transaction: false };
  
