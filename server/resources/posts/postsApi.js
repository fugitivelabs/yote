/***********************************************************

API for __Proper__.

***********************************************************/

var posts = require('./postsController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/posts'              , requireLogin(), posts.create);

  // - Read
  router.get('/api/posts'               , posts.list);
  router.get('/api/posts/featured'      , posts.getFeatured);
  router.get('/api/posts/published'     , posts.getPublished);
  router.get('/api/posts/search'        , posts.search);
  router.get('/api/posts/by-slug/:slug'  , posts.getBySlug);
  router.get('/api/posts/:id'           , posts.getById);

  // - Update
  router.put('/api/posts/:id'           , posts.update); // must login as post owner to update the post

  // - Delete
  router.delete('/api/posts/:id'        , requireRole('admin'), posts.delete); // must be an 'admin' to delete

}
