var mongoose = require('mongoose')
  , passport = require('passport')
  , api = require('./route-config')
  ;

console.log(api.users);

//helper functions
function requireLogin() {
  return function(req, res, next) {
    if(!req.isAuthenticated()) {
      res.status(403);
      res.send("UNAUTHORIZED - NOT LOGGED IN");
    } else {  next(); }
  }
}
function requireRole(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.send("UNAUTHORIZED - ADMIN PRIVILEDGEDS REQUIRED");
    } else {  next(); }
  }
}


module.exports = function(router) {

  /**************************** 
  /*  DEFAULT USER API ROUTES 
  /****************************/

  // user login
  router.post('/api/users/login', function(req, res, next) {
    console.log("DEBUG 1");
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local', function(err, user) {
      console.log("DEBUG 4");
      if(err) {
        res.send({success:false, message: "Error authenticating user."});
      }
      if(!user) {
        res.send({success:false, message: "Matching user not found."});
      }
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send({success:true, user: user});
      });
    })(req, res, next);
  });

  // user logout
  router.post('/api/users/logout', function(req, res) {
    req.logout();
    res.end();
  });

  // ==> users CRUD api
  // - Create
  router.post('/api/users'         , api.users.create);
  // - Read
  router.get('/api/users'          , requireRole('admin'), api.users.list); // must be an 'admin' to see the list of users
  // - Update
  // app.put('/api/users'          , api.users.update);
  // - Delete
  // app.del('/api/users'          , requireRole('admin'), api.users.delete);



  /**************************** 
  /*  CUSTOM API ROUTES 
  /****************************/


  // ==> posts CRUD api
  // - Create
  router.post('/api/posts'         , requireLogin(), api.posts.create);
  // - Read
  router.get('/api/posts'          , api.posts.list);
  router.get('/api/posts/byId:id'  , api.posts.getById); 
  router.get('/api/posts/:slug'    , api.posts.getBySlug);
  // - Update
  router.put('/api/posts/:slug'    , requireLogin(), api.posts.update); // must login as post owner to update the post
  // - Delete
  router.delete('/api/posts/:slug'    , requireRole('admin'), api.posts.delete); // must be an 'admin' to delete



  // ==> END CUSTOM API ROUTES



  // catch all other requests and send 404 
  router.all('/api/*', function(req, res) {
    res.send(404);
  });

// end file
}