
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, title: 'first product', description: 'abc'},
        {id: 2, title: 'next product', description: 'abc'},
        {id: 3,title: 'product xyz',  description: '123'}
      ]);
    });
};
