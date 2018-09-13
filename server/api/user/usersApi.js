/**
 * User's API includes login to session, login and retrieve API token, logout,
 * and standard CRUD.
 */

let passport = require('passport');
let User = require('mongoose').model('User');
let users = require('./usersController');
let logger = global.logger;

module.exports = function(router, requireLogin, requireRole) {

  // user login and use session cookies
  router.post('/api/users/login', function(req, res, next) {
    if(req.body.username == undefined) {
      res.send({ success: false, message: "No username present." });
    } else {
      req.body.username = req.body.username.toLowerCase();
      passport.authenticate('local', {session: true},  function(err, user) {
        if(err) {
          res.send({ success:false, message: "Error authenticating user." });
        } else if(!user) {
          res.send({ success:false, message: "Matching user not found." });
        } else {
          // User is authenticted. Now get actual user data from the db and log them in
          User.findById(user._id, (err, user) => {
            if(err || !user) {
              res.send({ success: false, message: "Error logging user in." });
            } else {
              req.logIn(user, function(err) {
                if(err) { return next(err);}
                logger.warn(req.user);
                res.send({ success: true, user: user });
              });
            }
          })
        }
      })(req, res, next);
    }
  });

  // user want to login and use an API token instead of session cookies -- i.e. for mobile
  router.post('/api/users/token', function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local', { session: false }, function(err, user) {
      if(err) {
        res.send({ success:false, message: "Error authenticating user." });
      }
      if(!user) {
        res.send({ success:false, message: "Matching user not found." });
      }
      logger.debug("TOKEN TIME");
      user.createToken(function(err, token) {
        if(err || !token) {
          res.send({ success: false, message: "Unable to generate user API token" });
        } else {
          logger.debug("TOKEN");
          logger.debug(token);
          User.findById(user._id, (err, user) => {
            if(err || !user) {
              res.send({ success: false, message: "Error retrieving matching user" });
            } else {
              // pass token explicitly to be stored on the mobile side
              // NOTE: this is the only way that a user token should be returned
              res.send({ success: true, user, token });
            }
          })
        }
      });
    })(req, res, next);
  });

  // user logout
  router.post('/api/users/logout', requireLogin(), function(req, res) {
    // logout with token will not affect session status, and vice-versa
    logger.debug("logout");
    if(req.headers.token) {
      logger.debug("logout with token");
      // remove token object
      User.findOne({ apiToken: req.headers.token }).exec(function(err, user) {
        if(err || !user) {
          logger.error("could not find user object to log out with");
          res.send({ success: false, message: "could not find user object to log out with" })
        } else {
          user.removeToken(function(err) {
            if(err) {
              logger.error(err);
              res.send({ success: false, message: "could not remove user token" });
            } else {
              logger.debug("removed token");
              res.send({ success: true, message: "User logged out via token" });
            }
          });
        }
      });
    } else {
      logger.debug("logout with cookie");
      /**
       * NOTE: known issues with passport local and logging out.
       * Not sure why this hasnt been a bigger issue for us before.
       * but we'd rather do this with our normal success true/false for consistency
       * https://github.com/jaredhanson/passport/issues/246
       */

       // // NOTE: Uncomment below to do it with status codes:
       // req.logout();
       // res.status(200).end();

      req.session.destroy(function(err) {
        req.logout();
        if(err) {
          res.send({ success: false, err: err, message: "Error logging user out" });
        } else {
          logger.debug("REMOVED SESSION OBJECT");
          res.send({ success: true, message: "User logged out." });
        }
      });
    }
  });


  /**
   * User's CRUD API
   */

  // - Create
  router.post('/api/users/register'     , users.register); // create and login
  router.post('/api/users'              , requireRole('admin'), users.create); // create without login

  // - Read
  router.get('/api/users'               , requireRole('admin'), users.list); // must be an 'admin' to see the list of users
  router.get('/api/users/by-:refKey/:refId*'  , requireRole('admin'), users.listByRefs);
  router.get('/api/users/by-:refKey-list'    , requireRole('admin'), users.listByValues);
  router.get('/api/users/get-logged-in' , requireLogin(), users.getLoggedInUser);
  router.get('/api/users/:id'           , requireRole('admin'), users.getById); // must be an 'admin' to see individual user info

  // - Update
  router.put('/api/users/update-profile'     , requireLogin(), users.updateProfile);
  router.put('/api/users/:userId'      , requireLogin(), users.update);
  router.post('/api/users/password'    , requireLogin(), users.changePassword);
  router.post('/api/users/request-password-reset'          , users.requestPasswordReset);
  router.get('/api/users/check-reset-request/:resetHex'    , users.checkResetRequest);
  router.post('/api/users/reset-password'                 , users.resetPassword);

  // - Delete
  // NOTE: Be careful with this...
  router.delete('/api/users/:userId'   , requireRole('admin'), users.delete);


}
