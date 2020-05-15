/**
 * The usersController handles all business logic for the User resource
 *
 * NOTE:  All "Update" logic should be limited to the logged in user or admin
 * protected in the API
 */

// get the appUrl for the current environment
let appUrl = require('../../config')[process.env.NODE_ENV].appUrl;

// get secrets if needed
// let secrets = require('../../config')[process.env.NODE_ENV].secrets;

let User = require('mongoose').model('User');
let emailUtil = require('../../global/utils/email');
let logger = global.logger;

exports.getLoggedInUser = (req, res) => {
  /**
   * Check if user is logged in and if so return the user object
   * Relies on existing "requireLogin" to populate the user
   * To be used for checking login status and refreshing user on mobile
   */
  res.send({success: true, user: req.user})
}

exports.list = function(req, res) {
  // check if query is paginated.
  if(req.query.page) {
    logger.debug("listing users with pagination");
    let page = req.query.page || 1;
    let per = req.query.per || 20;
    User.find({}).skip((page-1)*per).limit(per).exec(function(err, users) {
      if(err || !users) {
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , users: users
          , pagination: {
            page: page
            , per: per
          }
        });
      }
    });
  } else {
    logger.debug("listing users");
    User.find({}).exec(function(err, users) {
      if(err || !users) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, users: users });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of users queried from the array of _id's passed in the query param
   *
   * NOTES:
   * 1) looks like the best syntax for this is, "?id=1234&id=4567&id=91011"
   *    still a GET, and more or less conforms to REST uri's
   *    additionally, node will automatically parse this into a single array via "req.query.id"
   * 2) node default max request headers + uri size is 80kb.
   *    experimentation needed to determie what the max length of a list we can do this way is
   * TODO: server side pagination
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    User.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, users) => {
        if(err || !users) {
          res.send({success: false, message: `Error querying for users by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, users});
        }
    })
  }
}

exports.listByRefs = (req, res) => {
  /**
   * NOTE: This let's us query by ANY string or pointer key by passing in a refKey and refId
   * TODO: server side pagination
   */

  // build query
  let query = {
    [req.params.refKey]: req.params.refId === 'null' ? null : req.params.refId
  }
  // test for optional additional parameters
  const nextParams = req.params['0'];
  if(nextParams.split("/").length % 2 == 0) {
    res.send({success: false, message: "Invalid parameter length"});
  } else {
    if(nextParams.length !== 0) {
      for(let i = 1; i < nextParams.split("/").length; i+= 2) {
        query[nextParams.split("/")[i]] = nextParams.split("/")[i+1] === 'null' ? null : nextParams.split("/")[i+1]
      }
    }
    User.find(query, (err, users) => {
      if(err || !users) {
        res.send({success: false, message: `Error retrieving users by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, users})
      }
    })
  }
}

exports.getById = function(req, res) {
  User.findById(req.params.id).exec(function(err, user) {
    if(err || !user) {
      res.send({ success: false, message: "Error retrieving user", err: err });
    } else {
      res.send({ success: true, user: user });
    }
  })
}

exports.utilCheckAndSaveUser = function(userData, callback) {
  /**
   * NOTE: We need both register and create for yote admin to function.
   * This util method handles most of the creation stuff
   */

  // Remove case senstivity and trim whitespase on the username
  userData.username = userData.username.toLowerCase().trim();

  // very simple email format validation
  if (!( /(.+)@(.+){2,}\.(.+){2,}/.test(userData.username) )) {
    logger.debug("invalid email");
    callback({ success: false, message: "Invalid email address." });
    return;
  }

  // check password for length
  if(userData.password.length <= 6) {
    logger.debug("password too short");
    callback({ success: false, message: "Password not long enough. Min 6 characters." });
    return;
  }

  // perform additional checks
  userData.password_salt = User.createPasswordSalt();
  userData.password_hash = User.hashPassword(userData.password_salt, userData.password);

  User.create(userData, function(err, user) {
    if(err || !user) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      callback({ success: false, message: "Username is already in use." });
    } else {
      callback({ success: true, user: user });
    }
  });
}

exports.create = function(req, res) {
  let userData = req.body;
  exports.utilCheckAndSaveUser(userData, function(result) {
    res.send(result);
  });
}

exports.register = function(req, res, next) {
  let userData = req.body;
  userData.roles = []; // don't let registering user set their own roles
  exports.utilCheckAndSaveUser(userData, function(result) {
    if(!result.success) {
      res.send(result);
    } else {
      req.login(result.user, function(err) {
        if(err) {
          logger.error("ERROR LOGGING IN NEW USER");
          logger.error(err);
          return next(err);
        } else {
          // check if this is coming from mobile & requires a token in response
          if(req.param("withToken")) {
            logger.info("create api token for mobile user");
            result.user.createToken(function(err, token) {
              if(err || !token) {
                res.send({ success: false, message: "unable to generate user API token" });
              } else {
                res.send({ success: true, user: result.user, token });
              }
            });
          } else {
            logger.info("NEWLY REGISTERED USER LOGGING IN");
            logger.warn(req.user.username);
            res.send({ success:true, user: result.user });
          }
        }
      });
    }
  });

}

exports.update = function(req, res) {
  /**
   * NOTE: this is intended to be things an "admin" user can update about any
   * user in the system.
   * i.e. (user roles/permissions, etc.)
   */
  User.findOne({_id: req.param('userId')}).exec(function(err, user) {
    if(err || !user) {
      res.send({ success: false, message: "Could not find user" });
    } else {
      // NOTE: Do NOT user standard Yote update loop. Don't allow update of protected fields.
      user.username = req.param('username');
      user.firstName = req.param('firstName');
      user.lastName = req.param('lastName');
      user.updated = new Date();
      user.roles = req.param('roles');
      user.save(function(err, user) {
        if(err || !user) {
          if(err) {
            console.log(err);
          }
          res.send({ success: false, message: "Error saving user update" });
        } else {
          res.send({ success: true, user: user });
        }
      });
    }
  });
}

exports.updateProfile = function(req, res) {
  /**
   * NOTE: this is intended to be things the user updates about themselves
   * i.e. (billing info, profile picture, account status, etc.)
   *
   * NOTE: Also, this is separate from password updates, which has its own method
   */

  User.findOne({ _id: req.user }).exec(function(err, user) {
    if(err || !user) {
      res.send({ success: false, message: "Could not find user" });
    } else {
      // NOTE: Do NOT user standard Yote update loop. Don't allow update of protected fields.
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.updated = new Date();
      user.save(function(err, user) {
        if(err || !user) {
          res.send({ success: false, message: "Error saving user profile" });
        } else {
          res.send({ success: true, user: user });
        }
      });
    }
  });
}

exports.changePassword = function(req, res) {
  /**
   * This is a special method that allows the user to change their password from
   * within the client
   */

  logger.debug("change password");

  // validate new password
  if(req.param('newPass') !== req.param('newPassConfirm')) {
    res.send({ success: false, message: "New passwords do not match" });
  } else if(req.param('newPass') == "") {
    res.send({ success: false, message: "Invalid New Password" });
  }

  // define the items we want to return with the user
  let projection = {
    updated: 1, firstName: 1, lastName: 1, username: 1, password_salt: 1, password_hash: 1, roles: 1
  }

  User.findOne({ _id: req.user._id }, projection).exec(function(err, user) {
    if(err || !user) {
      res.send({ success: false, message: "Could not find user in db" });
    } else {
      if(req.param('oldPass') == "") {
        res.send({ success: false, message: "Old Password Incorrect" });
      }
      // Check that the old password is correct
      logger.debug("checking old password...");
      if(User.hashPassword(user.password_salt, req.param('oldPass')) == user.password_hash) {
        // old password is correct. Now change it.
        logger.debug("password matches.");
        let newSalt = User.createPasswordSalt();
        let newHash = User.hashPassword(newSalt, req.param('newPass'));
        user.password_salt = newSalt;
        user.password_hash = newHash;
        user.save(function(err, user) {
          if(err || !user) {
            res.send({ success: false, message: "Error updating user password" });
          } else {
            res.send({ success: true, message: "Success! Please login with your new password." });
          }
        });

      } else {
        res.send({ success: false, message: "Old Password Incorrect" });
      }
    }
  })
}

exports.requestPasswordReset = function(req, res) {
  /**
   * Let the user request that a password reset link is sent to their email/username
   */
  logger.debug("user requested password reset for " + req.param('email'));
  if(req.param('email') == "") {
    res.send({ success: false, message: "Email needed to reset password." });
  }

  let projection = {
    firstName: 1, lastName: 1, username: 1, roles: 1, resetPasswordTime: 1, resetPasswordHex: 1
  }

  User.findOne({ username: req.param('email') }, projection).exec(function(err, user) {
    if(err || !user) {
      logger.debug("fail: no user with that email found");
      res.send({ success: false, message: "No user with that email found. Please register." });
    } else {
      // found user who requested a password reset
      user.resetPasswordTime = new Date();
      user.resetPasswordHex = Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16);
      user.save(function(err, user) {
        if(err) {
          logger.error("fail: error saving user reset options");
          res.send({ success: false, message: "Error processing request. Please try again." });
        } else {
          // send user an email with their reset link.
          logger.debug("creating password reset email");
          logger.error(user.resetPasswordHex);
          let targets = [user.username];
          let resetUrl = `http://${appUrl}/user/reset-password/${user.resetPasswordHex}`;
          let html = "<h1> You have requested a password reset for your YOTE account.</h1>";
          html += "<p>You reset link will be active for 24 hours. </p>";
          html += "<p>If you believe you received this email by mistake, please call (919) 414-4801 and ask for Zabajone.</p>";
          html += "<br><p>" + resetUrl + " Reset Yote Password</p>";

          emailUtil.sendEmail(targets, "Your Password for YOTE", html, function(data) {
            res.send({ success: data.success, message: data.message });
          });
        }
      });
    }
  });
}

exports.checkResetRequest = function(req, res) {
  // use the utility method to check for valid reset request
  exports.utilCheckResetRequest(req.params.resetHex, function(result) {
    if(result.success) {
      res.send({ success: true }); // DONT send user id back
    } else {
      res.send({ success: false, message: "Invalid or Expired Token" });
    }
  });
}

exports.utilCheckResetRequest = function(resetHex, callback) {
  /**
   * This checks that the user is using a valid password reset request.
   * Token must be a matching hex and no older than 24 hours.
   */
  var projection = {
    firstName: 1, lastName: 1, username: 1, roles: 1, resetPasswordTime: 1, resetPasswordHex: 1
  }
  User.findOne({ resetPasswordHex: resetHex }, projection).exec(function(err, user) {
    if(err || !user) {
      callback({ success: false, message: "1 Invalid or Expired Reset Token" });
    } else {
      let nowDate = new Date();
      let cutoffDate = new Date(user.resetPasswordTime);
      let validHours = 24;
      cutoffDate.setHours((cutoffDate.getHours() + validHours));
      if(nowDate < cutoffDate) {
        callback({ success: true, userId: user._id });
      } else {
        callback({ success: false, message: "2 Invalid or Expired Reset Token" });
      }

    }
  });
}


exports.resetPassword = function(req, res) {
  // before reseting the password, use the utility check to ensure a valid request
  exports.utilCheckResetRequest(req.param('resetHex'), function(result) {
    if(result.success) {
      if(!req.param('newPass') || req.param('newPass').length < 6) {
        logger.warn("needs to use a better password");
        res.send({ success: false, message: "Password requirements not met: Must be at least 6 characters long." }); //bare minimum
      } else {
        User.findOne({ _id: result.userId }).exec(function(err, user) {
          if(err || !user) {
            res.send({ success: false, message: "Could not find user in db" });
          } else {
            let newSalt = User.createPasswordSalt();
            let newHash = User.hashPassword(newSalt, req.param('newPass'));
            user.password_salt = newSalt;
            user.password_hash = newHash;
            user.resetPasswordHex = Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16);
            user.save(function(err, user) {
              if(err || !user) {
                res.send({ success: false, message: "Error updating user password" });
              } else {
                res.send({ success: true, user: user });
              }
            });
          }
        });
      }
    } else {
      res.send(result);
    }
  });
}

exports.delete = function(req, res) {
  logger.debug("deleting user " + req.param('userId'));

  User.findById(req.param('userId')).remove(function(err) {
    logger.debug("done removing?");
    logger.debug(err);
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted user."});
    }
  });
}
