
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_sexo_animal').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_sexo_animal').insert([
        {id_sexo: 1, tipo_sexo: 'Feminino'},
        {id_sexo: 2, tipo_sexo: 'Masculino'}
      ]);
    });
};
