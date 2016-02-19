/***********************************************************

API for Product.

***********************************************************/

var products = require('../../controllers/products');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/products'              ,  products.create); // must login by default

  // - Read
  router.get('/api/products'               , products.list);
  router.get('/api/products/search'        , products.search);
  router.get('/api/products/:id/populate'  , products.getAndPopulate);
  router.get('/api/products/:id'           , products.getById);

  // - Update
  router.put('/api/products/:id'           ,  products.update); // must login by default

  // - Delete
  router.delete('/api/products/:id'        , requireRole('admin'), products.delete); // must be an 'admin' by default

}
