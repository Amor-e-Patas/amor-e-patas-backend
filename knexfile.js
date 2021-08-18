// Update with your config settings.
//require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_USER,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_USER,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_USER,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  }
};
