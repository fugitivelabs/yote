var posts = require('../../controllers/posts');

module.exports = function(router, requireLogin, requireRole) {
  
  // - Create
  router.post('/api/posts'         , requireLogin(), posts.create);
  
  // - Read
  router.get('/api/posts'          , posts.list);
  router.get('/api/posts/byId/:id' , posts.getById); 
  router.get('/api/posts/:slug'    , posts.getBySlug);
  
  // - Update
  router.put('/api/posts/:slug'    , requireLogin(), posts.update); // must login as post owner to update the post
  
  // - Delete
  router.delete('/api/posts/:slug' , requireRole('admin'), posts.delete); // must be an 'admin' to delete

}