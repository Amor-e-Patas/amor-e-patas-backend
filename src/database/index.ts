//require('dotenv').config();
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
<<<<<<< Updated upstream
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
=======
    user: 'root',
    password: '123',
    database: 'amor-e-patas',
>>>>>>> Stashed changes
  }
});

export default db;