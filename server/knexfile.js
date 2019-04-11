// FOR REFERENCE (esp staging and prod)
// THIS WILL BE ADDED TO THE CONFIG.JS FILE INSTEAD

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: 'grantfowler'
      , host: 'localhost'
      , database: 'api'
      , port: 5432
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
