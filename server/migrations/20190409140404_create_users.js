
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('_id').primary()
      table.string('username').unique()
      // table.unique('username')
      table.string('password_salt', 511) // longer to accomodate 256 bit salt
      table.string('password_hash')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
