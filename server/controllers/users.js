var User = require('mongoose').model('User')
  ;

exports.list = function(req, res) {
  User.find({}).exec(function(err, users) {
    res.send(users);
  });
}

exports.create = function(req, res, next) {
  var userData = req.body;
  userData.username = userData.username.toLowerCase();
  userData.password_salt = User.createPasswordSalt();
  userData.hashed_password = User.hashed_password(userData.password_salt, userData.password);
  User.create(userData, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send(user);
    });
  });
}

exports.update = function(req, res) {
  res.send("update user called");
}