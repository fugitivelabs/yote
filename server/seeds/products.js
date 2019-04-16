
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {_id: 1, title: 'first product', description: 'abc'},
        {_id: 2, title: 'next product', description: 'abc'},
        {_id: 3,title: 'product xyz',  description: '123'}
      ]);
    });
};
