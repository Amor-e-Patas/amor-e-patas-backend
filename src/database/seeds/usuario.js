
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('db_usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('db_usuario').insert([
        {id_usuario: 1, nome_usu: 'Teste', cpf: '261.147.920-84', data_nasc: '2021-09-16', genero: 'Feminino', id_login: 1},
      ]);
    });
};
