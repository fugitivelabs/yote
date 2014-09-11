var User = require('mongoose').model('User')
  ;

exports.list = function(req, res) {
  User.find({}).exec(function(err, users) {
    res.send(users);
  });
}

exports.create = function(req, res, next) {
  var userData = req.body;
  if(userData.password !== userData.password2) {
    res.send({success: false, message: "Passwords do not match"});
  } else {
    userData.username = userData.username.toLowerCase();
    userData.password_salt = User.createPasswordSalt();
    userData.password_hash = User.hashPassword(userData.password_salt, userData.password);
    User.create(userData, function(err, user) {
      if(err) {
        if(err.toString().indexOf('E11000') > -1) {
          err = new Error('Duplicate Username');
        }
        res.send({success: false, message: "Username is already in use."});
      }
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send({success: true, user: user});
      });
    });
  }
}

exports.update = function(req, res) {
  res.send("update user called");
}