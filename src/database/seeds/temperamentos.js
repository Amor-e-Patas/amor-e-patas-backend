
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_temperamento').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_temperamento').insert([
        {id_temperamento: 1, descricao: 'Dócil'},
        {id_temperamento: 2, descricao: 'Agressivo'},
        {id_temperamento: 3, descricao: 'Brincalhão'},
        {id_temperamento: 4, descricao: 'Sociável'},
        {id_temperamento: 5, descricao: 'Arisco'},
        {id_temperamento: 6, descricao: 'Independente'},
        {id_temperamento: 7, descricao: 'Carente'},
        {id_temperamento: 8, descricao: 'Calmo'}
      ]);
    });
};
