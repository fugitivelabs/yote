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
      res.send("UNAUTHORIZED - ADMIN PRIVILEDGEDS REQUIRED");
    } else {  next(); }
  }
}

module.exports = function(router) {
  //users
  require('./user-api-routes')(router, requireLogin, requireRole);
  //posts
  require('./post-api-routes')(router, requireLogin, requireRole);
  //new routes here

// end file
}