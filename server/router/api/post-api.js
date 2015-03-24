/***********************************************************

API for __Proper__.  

***********************************************************/

var posts = require('../../controllers/posts');

module.exports = function(router, requireLogin, requireRole) {
  
  // - Create
  router.post('/api/posts'              , requireLogin(), posts.create);
  
  // - Read
  router.get('/api/posts'               , posts.list);
  router.get('/api/posts/search'        , posts.search);
  router.get('/api/posts/bySlug/:slug'  , posts.getBySlug);
  router.get('/api/posts/populate/:id'  , posts.getAndPopulate);
  router.get('/api/posts/:id'           , posts.getById); 

  // - Update
  router.put('/api/posts/:id'           , requireLogin(), posts.update); // must login as post owner to update the post
  
  // - Delete
  router.delete('/api/posts/:id'        , requireRole('admin'), posts.delete); // must be an 'admin' to delete

}