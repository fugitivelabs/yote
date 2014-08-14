var User = require('mongoose').model('User')
  ;


exports.list = function(req, res) {
  User.find({}).exec(function(err, users) {
    res.send(users);
  });
}

exports.create = function(req, res) {
  res.send("create user");
}

exports.update = function(req, res) {
  res.send("udate user");
}