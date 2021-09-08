
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_sociavel').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_sociavel').insert([
        {id_sociavel: 1, descricao: 'Gatos'},
        {id_sociavel: 2, descricao: 'Desconhecidos'},
        {id_sociavel: 3, descricao: 'Cachorros'},
        {id_sociavel: 4, descricao: 'Crianças'}
        
      ]);
    });
};
