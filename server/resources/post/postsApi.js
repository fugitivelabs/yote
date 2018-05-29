/**
 * CRUD API for Post.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var posts = require('./postsController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/posts'               , requireLogin(), posts.create); // must login by default

  // - Read
  router.get('/api/posts'                   , requireLogin(), posts.list);
  router.get('/api/posts/search'            , requireLogin(), posts.search);
  router.get('/api/posts/by-:refKey/:refId*', requireLogin(), posts.listByRefs);
  router.get('/api/posts/by-:refKey-list'   , requireLogin(), posts.listByValues);
  router.get('/api/posts/:id'               , requireLogin(), posts.getById);

  // - Update
  router.put('/api/posts/:id'            , requireLogin(), posts.update); // must login by default

  // - Delete
  router.delete('/api/posts/:id'         , requireRole('admin'), posts.delete); // must be an 'admin' by default

}
