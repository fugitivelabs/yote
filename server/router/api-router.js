console.log("api routes file");

var mongoose = require('mongoose')
  , passport = require('passport')
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
      res.send("UNAUTHORIZED - " + role.toUppercase() + " PRIVILEDGES REQUIRED");
    } else {  next(); }
  }
}

module.exports = function(router) {
  //users
  require('./api/user-api')(router, requireLogin, requireRole);
  //posts
  require('./api/post-api')(router, requireLogin, requireRole);

// end file
}