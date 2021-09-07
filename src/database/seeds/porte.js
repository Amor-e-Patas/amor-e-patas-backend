
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_porte').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_porte').insert([
        {id_porte: 1, tipo_porte: 'Grande', descricao: '50 cm'},
        {id_porte: 2, tipo_porte: 'Pequeno', descricao: '20 cm'},
        {id_porte: 3, tipo_porte: 'Médio', descricao: '10 cm'}
      ]);
    });
};
