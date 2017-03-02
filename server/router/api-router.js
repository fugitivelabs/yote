logger.debug("api routes file");

var mongoose = require('mongoose')
  , passport = require('passport')
  , User = require('mongoose').model('User')
  ;

//helper functions
function requireLogin() {
  return function(req, res, next) {
    if(req.headers.token) {
      logger.debug("LOGIN CHECK HIT - by token");
      //check by token
      logger.debug(req.headers.token);
      User.findOne({apiToken: req.headers.token}).exec(function(err, user) {
        if(err || !user) {
          logger.error(err);
          res.status(403);
          res.send("UNAUTHORIZED - INVALID TOKEN");
        } else {
          logger.debug("found user by header");
          //check token time period
          if(User.tokenExpired(user.tokenCreated)) {
            logger.debug("token is expired");
            res.status(403);
            res.send("UNAUTHORIZED - TOKEN HAS EXPIRED");
          } else {
            req.user = user;
            logger.debug("REQ.USER 1");
            logger.debug(req.user.username);
            next();
          }
        }
      });

    } else {
      logger.debug("LOGIN CHECK HIT - by cookie");
      console.log(req.user.username);
      //check by passport session
      if(!req.isAuthenticated()) {
        console.log("UNAUTHORIZED");
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
      logger.debug("trying to require role");
      logger.debug(req.user.username);
      if(req.user.roles.indexOf(role) === -1) {
        res.status(403);
        res.send("UNAUTHORIZED - " + role + " PRIVILEDGES REQUIRED");
      } else {
        logger.debug("authorized.");
        next();
      }
    });
  }
}

//slightly convoluted, but works well with the CLI
var routeFilenames = [];
module.exports = function(router) {
  routeFilenames.forEach(function(filename) {
    logger.debug("filename: " + filename);
    require('../resources/' + filename)(router, requireLogin, requireRole);
  });
}

//route names for use with CLI
routeFilenames.push('users/usersApi');
routeFilenames.push('posts/postsApi');
routeFilenames.push('products/productsApi');