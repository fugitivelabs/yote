//get secrets
var secrets = require('../config')[process.env.NODE_ENV].secrets;

var User = require('mongoose').model('User')
  , mandrill = require('mandrill-api/mandrill')
  , mandrill_client = new mandrill.Mandrill(secrets.mandrill) //grant's key
  ;

exports.list = function(req, res) {
  if(req.query.page) {
    console.log("listing users with pagination");
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    User.find({}).skip((page-1)*per).limit(per).exec(function(err, users) {
      if(err || !users) {
        res.send({success: false, message: err});
      } else {
        res.send({success: true, users: users
          , pagination: {
            page: page
            , per: per
          }
        });
      }
    });
  } else {
    console.log("listing users");
    User.find({}).exec(function(err, users) {
      if(err || !users) {
        res.send({success: false, message: err});
      } else {
        res.send({success: true, users: users});
      }
    });
  }
}

exports.changePassword = function(req, res) {
  if(!req.user || !req.user.id) {
    res.send({success: false, message: "Invalid User Id"});
  } else {
    User.findOne({_id: req.user._id}).exec(function(err, user) {
      if(err || !user) {
        res.send({success: false, message: "Invalid User Id"});
      } else {
        res.send(user);
      }
    });
  }
}

exports.create = function(req, res, next) {
  var userData = req.body;
  if(userData.password !== userData.password2) {
    res.send({success: false, message: "Passwords do not match"});
  } else {
    userData.username = userData.username.toLowerCase();
    //very simple email format validation
    if (!( /(.+)@(.+){2,}\.(.+){2,}/.test(userData.username) )) {
      console.log("invalid email");
      res.send({success: false, message: "Invalid email address."});
      return;
    }
    //check password for length
    if(userData.password.length <= 6) {
      console.log("password too short");
      res.send({success: false, message: "Password not long enough. Min 6 characters."});
      return;
    }
    userData.password_salt = User.createPasswordSalt();
    userData.password_hash = User.hashPassword(userData.password_salt, userData.password);
    User.create(userData, function(err, user) {
      if(err || !user) {
        if(err.toString().indexOf('E11000') > -1) {
          err = new Error('Duplicate Username');
        }
        res.send({success: false, message: "Username is already in use."});
      } else {
        req.logIn(user, function(err) {
          if(err) {return next(err);}
          res.send({success: true, user: user});
        });
      }
    });
  }
}

exports.update = function(req, res) {
  //update user object EXCEPT for password related fields
  User.findOne({_id: req.param('userId')}).exec(function(err, user) {
    if(err || !user) {
      res.send({success: false, message: "Could not find user"});
    } else {
      //not standard yote with the loop; can't allow update of protected fields.
      user.username = req.param('username');
      user.firstName = req.param('firstName');
      user.lastName = req.param('lastName');
      user.updated = new Date();
      user.roles = req.param('roles');
      user.save(function(err, user) {
        if(err || !user) {
          res.send({success: false, message: "Error saving user profile"});
        } else {
          res.send({success: true, user: user});
        }
      });
    }
  });
}

exports.changePassword = function(req, res) {
  console.log("change password");
  //additional error checking
  if(req.param('newPass') !== req.param('newPassConfirm')) {
    res.send({success: false, message: "New passwords do not match"});
  }
  //do additional validation here (must contain special character, etc)
  else if(req.param('newPass') == "") { 
    res.send({success: false, message: "Invalid New Password"});
  }
  var projection = {
    updated: 1, firstName: 1, lastName: 1, username: 1, password_salt: 1, password_hash: 1, roles: 1
  }
  User.findOne({_id: req.user._id}, projection).exec(function(err, user) {
    if(err || !user) {
      res.send({success: false, message: "Could not find user in db"});
    } else {
      if(req.param('oldPass') == "") {
        res.send({success: false, message: "Old Password Incorrect"});
      }
      console.log("checking old password...");
      //is old password correct?
      if(User.hashPassword(user.password_salt, req.param('oldPass')) == user.password_hash) {
        console.log("password matches.");

        var newSalt = User.createPasswordSalt();
        var newHash = User.hashPassword(newSalt, req.param('newPass'));
        user.password_salt = newSalt;
        user.password_hash = newHash;
        user.save(function(err, user) {
          if(err) {
            res.send({success: false, message: "Error updating user password"});
          } else {
            res.send({success: true, message: "Success! Please login with your new password."});
          }
        });

      } else {
        res.send({success: false, message: "Old Password Incorrect"});
      }
    }
  })
}

exports.requestPasswordReset = function(req, res) {
  console.log("user requested password reset for " + req.param('email'));
  if(req.param('email') == "") {
    res.send({success: false, message: "Email needed to reset password."});
  }
  var projection = {
    firstName: 1, lastName: 1, username: 1, roles: 1, resetPasswordTime: 1, resetPasswordHex: 1
  }
  User.findOne({username: req.param('email')}, projection).exec(function(err, user) {
    if(err || !user) {
      console.log("fail: no user with that email found");
      res.send({success: false, message: "No user with that email found. Please register."});
    } else {
      //found user who requested a password reset
      user.resetPasswordTime = new Date();
      user.resetPasswordHex = Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16);
      user.save(function(err, user) {
        if(err) {
          console.log("fail: error saving user reset options");
          res.send({success: false, message: "Error processing request. Please try again."});
        } else {
          //send user an email with their reset link.
          console.log("creating password reset email");
          var resetUrl = "http://localhost:3030/user/resetpassword/" + user.resetPasswordHex;
          var message = {};
          message.html = "";
          message.html += "<h1> You have requested a password reset for Fugitive Labs YOTE.</h1>";
          message.html += "<p> You reset link will be active for 24 hours. ";
          message.html += "If you believe you received this email by mistake, please call (919) 414-4801 and ask for Zabajone.</p>";
          message.html += "<br><p>" + resetUrl + " Reset YOTE Password</p>";

          message.from_email = "accounts@fugitivelabs.com";
          message.from_name = "fugitivelabs.com";

          message.to = [{
            "email": user.username
            , "name": user.firstName + " " + user.lastName
            , "type": "to"
          }];
          message.auto_text = true;
          var async = false;
          mandrill_client.messages.send({"message": message, "async":async}, function (result) {
            console.log(result);
            console.log("success: send user email");
            res.send({success: true, result: result});
          }, function(e){
            res.send({success: false, error: e});
            console.log("A mandrill error occured: " + e.name + ' - ' + e.message);
          });
        }
      });
    }
  });
}

exports.checkResetRequest = function(req, res, next) {
  //must be a valid hex and no older than 24 hours
  var nowDate = new Date();
  var projection = {
    firstName: 1, lastName: 1, username: 1, roles: 1, resetPasswordTime: 1, resetPasswordHex: 1
  }
  User.findOne({resetPasswordHex: req.param('resetHex')}, projection).exec(function(err, user) {
    if(err || !user) {
      res.send({success: false, message: "Invalid or Expired Reset Token"});
    } else {

      var nowDate = new Date();
      var cutoffDate = new Date(user.resetPasswordTime);
      console.log(cutoffDate);
      var validHours = 24;
      cutoffDate.setHours((cutoffDate.getHours() + validHours));
      console.log(cutoffDate);
      if(nowDate < cutoffDate) {
        console.log("TRUE");
        res.send({success: true, userId: user._id});
      } else {
        console.log("FALSE");
        res.send({success: false, message: "Invalid or Expired Reset Token"});
      }

    }
  });
}

exports.resetPassword = function(req, res) {
    var projection = {
      firstName: 1, lastName: 1, username: 1, password_salt: 1, password_hash: 1, roles: 1
    }
    User.findOne({_id: req.param('userId')}, projection).exec(function(err, user) {
      if(err || !user) {
        res.send({success: false, message: "Could not find user in db"});
      } else {
        var newSalt = User.createPasswordSalt();
        var newHash = User.hashPassword(newSalt, req.param('newPass'));
        user.password_salt = newSalt;
        user.password_hash = newHash;
        user.save(function(err, user) {
          if(err || !user) {
            res.send({success: false, message: "Error updating user password"});
          } else {
            res.send({success: true, message: "Updated password! Please login."});
          }
        });
      }
    });
}
