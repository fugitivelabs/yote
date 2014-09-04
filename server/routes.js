var mongoose = require('mongoose')
  , users = require('./controllers/users')
  , User = mongoose.model('User')
  , posts = require('./controllers/posts')
  , Post = mongoose.model('Post')
  ;

//helper functions
function requireLogin() {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {  next(); }
}
function requireRole(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {  next(); }
  }
}

//define routes
module.exports = function(app) {
  //users
  app.get('/api/users'          , requireRole('admin'), users.list);
  app.post('/api/users'         , users.create);
  app.put('/api/users'          , users.update);
  //posts
  app.get('/api/posts'          , posts.list);
  app.get('/api/posts/:id'      , posts.getById);

  //catch all other api calls
  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  //render angularized jade views as html
  app.get('/views/*', function(req, res) {
    res.render('../../public/app/views/' + req.params);
  });

  //login
  app.post('/login', function(req, res) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user) {
      if(err) {return next(err);}
      if(!user) { res.send({success:false})}
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send({success:true, user: user});
      });
    });
    auth(req, res, next);
  });
  //logout
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  //index
  app.get('*', function(req, res) {
    res.render('index', {
      currentUser: req.user
    });
  });

}