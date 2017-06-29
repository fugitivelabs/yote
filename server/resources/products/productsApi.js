/**
 * CRUD API for Product.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var products = require('./productsController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/products'               , requireLogin(), products.create); // must login by default

  // - Read
  router.get('/api/products'                , products.list);
  router.get('/api/products/list'           , products.listByIds)
  router.get('/api/products/by-:refKey/:refId'   , products.listByRef);
  router.get('/api/products/search'         , products.search);
  router.get('/api/products/:id'            , products.getById);

  // - Update
  router.put('/api/products/:id'            , requireLogin(), products.update); // must login by default

  // - Delete
  router.delete('/api/products/:id'         , requireRole('admin'), products.delete); // must be an 'admin' by default

}
