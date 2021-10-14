
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_status').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_status').insert([
        {descricao: 'Aprovado'},
        {descricao: 'Reprovado'},
        {descricao: 'Em análise'}        
      ]);
    });
};
