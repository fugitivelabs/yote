console.log("api routes file");

var mongoose = require('mongoose')
  , passport = require('passport')
  , User = require('mongoose').model('User')
  ;

//helper functions
function requireLogin() {
  return function(req, res, next) {
    console.log("LOGIN CHECK HIT");
    if(req.headers.token) {
      //check by token
      console.log(req.headers.token);
      User.findOne({apiToken: req.headers.token}).exec(function(err, user) {
        if(err || !user) {
          console.log(err);
          res.status(403);
          res.send("UNAUTHORIZED - INVALID TOKEN");
        } else {
          console.log("found user by header");
          //check token time period
          if(User.tokenExpired(user.tokenCreated)) {
            console.log("token is expired");
            res.status(403);
            res.send("UNAUTHORIZED - TOKEN HAS EXPIRED");
          } else {
            req.user = user;
            console.log("REQ.USER 1");
            console.log(req.user);
            next();
          }
        }
      });

    } else {
      //check by passport session
      if(!req.isAuthenticated()) {
        res.status(403);
        res.send("UNAUTHORIZED - NOT LOGGED IN");
      } else {  next(); }
    }
  }
}
function requireRole(role) {
  return function(req, res, next) {
    var rl = requireLogin();
    rl(req, res, function() {
      console.log("trying to require role");
      console.log(req.user);
      if(req.user.roles.indexOf(role) === -1) {
        res.status(403);
        res.send("UNAUTHORIZED - " + role + " PRIVILEDGES REQUIRED");
      } else {
        console.log("authorized.");
        next();
      }
    });
  }
}

//slightly convoluted, but works well with the CLI
var routeFilenames = [];
module.exports = function(router) {
  routeFilenames.forEach(function(filename) {
    console.log("filename: " + filename);
    require('./api/' + filename)(router, requireLogin, requireRole);
  });
}

//route names for use with CLI
routeFilenames.push('user-api');
routeFilenames.push('post-api');