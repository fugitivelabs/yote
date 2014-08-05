var User = require('mongoose').model('User');

module.exports = {

  list: function(req, res) {
    User.find({}).exec(function(err, users) {
      res.send(users);
    });
  }
  , create: function(req, res, next) {
    var data = req.body;
    data.username = data.username.toLowerCase();
    User.create(data, function(err, newUser) {
      if(err) {
        if(err.toString().indexOf('E11000') > -1) {
          err = new Error('Duplicate Username');
        }
        res.status(400);
        return res.send({reason:err.toString()});
      } else {
        req.logIn(user, function(err) {
          if(err) {
            return next(err);
          } else {
            res.send(user);
          }
        });
      }
    });
  }

}