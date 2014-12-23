var passport = require('passport');
var users = require('../../controllers/users');

module.exports = function(router, requireLogin, requireRole) {
    // user login
  router.post('/api/users/login', function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local', function(err, user) {
      if(err) {
        res.send({success:false, message: "Error authenticating user."});
      }
      if(!user) {
        res.send({success:false, message: "Matching user not found."});
      }
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        // by necessity, this user object has all of the password fields.
        // we still want to remove hidden values, though, so lets try javascript rather than do another db query.
        var returnUser = {
          _id: user._id
          , firstName: user.firstName
          , lastName: user.lastName
          , username: user.username
          , roles: user.roles
        }
        console.log(returnUser);
        res.send({success:true, user: returnUser});
      });
    })(req, res, next);
  });

  // user logout
  router.post('/api/users/logout', function(req, res) {
    req.logout();
    res.end();
  });

  // ==> users CRUD api
  // - Create
  router.post('/api/users'         , users.create);

  // - Read
  router.get('/api/users'          , requireRole('admin'), users.list); // must be an 'admin' to see the list of users

  // - Update
  router.put('/api/users/:userId'      , requireLogin(), users.update);
  router.post('/api/users/password'    , requireLogin(), users.changePassword);
  router.post('/api/users/requestpasswordreset'          , users.requestPasswordReset);
  router.get('/api/users/checkresetrequest/:resetHex'    , users.checkResetRequest);
  router.post('/api/users/resetpassword'                 , users.resetPassword);
  // - Delete
  // router.del('/api/users'          , requireRole('admin'), users.delete);


}