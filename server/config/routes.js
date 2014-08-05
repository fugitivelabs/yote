var mongoose = require('mongoose')
  , passport = require('passport')
  , User = require('mongoose').model('User')
  , users = require('../controllers/users')
  ;

//helper methods
function authenticate(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {
      return next(err);
    }
    if(!user) {
      res.send({
        success:false
      });
    }
    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }
      res.send({success:true, user: user});
    });
  });
  auth(req, res, next);
}

function requireLogin(req, res, next) {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(403);
    res.end();
  }
}
function requireRole(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}

module.exports = function(app) {
  //define routes

  //users
  app.get('/api/users', requireRole('admin'), users.list);
  app.post('/api/users', users.create);

  //render any jade partial as html
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params);
  });

  //login and logout
  app.post('/login', authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  //catch for non-supported api calls
  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  // app.get('*', function(req, res) {
  //   res.render('index', {
  //     bootstrappedUser: req.user
  //   });
  // });

}