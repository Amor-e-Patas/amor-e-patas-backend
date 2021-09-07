
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_especie').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_especie').insert([
        {id_especie: 1, nome_esp: 'Gato'},
        {id_especie: 2, nome_esp: 'Cachorro'}
      ]);
    });
};
