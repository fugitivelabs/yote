var mongoose = require('mongoose')
  , passport = require('passport')
  , users = require('./controllers/users')
  , User = mongoose.model('User')
  , posts = require('./controllers/posts')
  , Post = mongoose.model('Post')
  ;

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

//define routes
module.exports = function(app) {

  //login, logout
  app.post('/api/users/login', function(req, res, next) {
    console.log("DEBUG 1");
    req.body.username = req.body.username.toLowerCase();
    // console.log(req.body.username);
    // console.log(req.body.password);
    //
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
  app.post('/api/users/logout', function(req, res) {
    req.logout();
    res.end();
  });

  //API CALLS
  //users
  app.get('/api/users'          , requireRole('admin'), users.list);
  app.post('/api/users'         , users.create);
  // app.put('/api/users'          , users.update);
  //posts
  app.get('/api/posts'          , posts.list);
  app.get('/api/posts/byId:id'  , posts.getById); //no longer defaults to "by Id", instead by slug
  app.get('/api/posts/:slug'    , posts.getBySlug);

  app.post('/api/posts'         , requireLogin(), posts.create);
  app.put('/api/posts/:slug'    , requireLogin(), posts.update);
  app.del('/api/posts/:slug'    , requireRole('admin'), posts.delete);

  //catch all others
  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  //render jade views as html
  app.get('/views/*', function(req, res) {
    res.render('../../public/app/views/' + req.params);
  });

  //index
  app.get('*', function(req, res) {
    res.render('layout', {
      currentUser: req.user
    });
  });

}
