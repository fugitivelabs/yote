
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string('description')
      table.string('title').unique()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
