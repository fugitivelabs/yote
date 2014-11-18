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