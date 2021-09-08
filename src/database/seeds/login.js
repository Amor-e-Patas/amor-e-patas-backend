
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_login').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_login').insert([
        {id_login: 1, email: 'teste@teste.com', senha: '123'}
      ]);
    });
};
