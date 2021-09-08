
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_vivencia').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_vivencia').insert([
        {id_vivencia: 1, descricao: 'Casa com quintal'},
        {id_vivencia: 2, descricao: 'Apartamento'}
        
      ]);
    });
};
