
/**
 * NOTE: this is a terrible name for the controller but best I could think of so far
 * 
 * GOAL: split the "standard" user crud stuff and the "logged in user" specific stuff
 * incl login, logout, register
 * also includes stuff like profile, password reset, etc
 */

 const crypto = require('crypto');

const User = require('mongoose').model('User');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')
const passport = require('passport');

exports.login = async (req, res, next) => {
  if(req.body.username == undefined) {
    throw new YoteError("No username present.", 400)
  } else {
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local', { session: true }, async (err, passportUser) => {
      // we can't throw errors in this async callback, instead send an error response
      if(err) {
        console.log("ERR", err)
        res.status(404).json("Error authenticating user.");
        // throw new YoteError("Error authenticating user.", 404);
      } else if(!passportUser) {
        res.status(404).json("Matching user not found.");
        // throw new YoteError("Matching user not found.", 404);
      } else {
        // User is authenticated. Now get actual user data from the db and log them in
        const user = await User.findById(passportUser._id).catch(err => {
          console.log(err);
          res.status(404).json("Error finding user.");
          // throw new YoteError("Error finding user", 404)
        });
        if(!user) {
          res.status(402).json("Could not retrieve user.");
          // throw new YoteError("Could not retrieve user.", 402);
        } else {
          req.logIn(user, err => {
            if(err) {
              res.status(402).json("Error logging in.");
            } else {
              // if(err) throw new YoteError("Error logging in.", 402)
              // set additional fields on session, for later display/user
              // ip address, useragent
              req.session['user-agent'] = req.headers['user-agent'];
      
              if(req.ip && typeof (req.ip) == 'string') {
                req.session.ip = req.ip;
              }
              // if this is a mobile request we need to return the token
              if(req.body.mobile) {
                let splitCookies = req.headers.cookie.split(';');
                let connectCookieVal;
                for(let next of splitCookies) {
                  if(next.includes('connect.sid')) {
                    connectCookieVal = next.trim().split('=')[1]
                    // console.log("connectCookieVal", connectCookieVal)
                  }
                }
                res.json({ user, token: connectCookieVal });
              } else {
                res.json(user);
              }
            }
          });
        }
      }
    })(req, res, next);
  }
}

exports.register = async (req, res) => {
  let newUser = new User({})
  // allow specific fields on register
  newUser.username = req.body.username.toLowerCase();

  // validation
  if(!User.validUsernameCheck(newUser.username)) {
    throw new YoteError("Invalid email address", 400)
  }
  const passwordFailureCheck = User.passwordStrengthCheck(req.body.password);
  if(passwordFailureCheck) {
    throw new YoteError(`Password Strength Check Failed: ${passwordFailureCheck}`, 400)
  }
  
  const { salt, hash } = User.generatePassword(req.body.password)
  newUser.password_salt = salt;
  newUser.password_hash = hash;

  // TODO: maybe some of the password history stuff? 
  const user = await newUser.save()

  // now re-fetch to make sure to only return "safe" fields
  const safeUser = await User.findById(user._id)
  if(!safeUser) {
    throw new YoteError("Could not find matching User", 404)
  }
  // we have the user, now login
  req.logIn(safeUser, err => {
    if(err) throw new YoteError("Error logging user in.", 402)
    // set additional fields on session, for later display/user
    // ip address, useragent
    req.session['user-agent'] = req.headers['user-agent'];

    if(req.ip && typeof(req.ip) == 'string' ) {
      req.session.ip = req.ip;
    }

    // if this is a mobile request we need to return the token
    if(req.body.mobile) {
      let splitCookies = req.headers.cookie.split(';');
      let connectCookieVal;
      for(let next of splitCookies) {
        if(next.includes('connect.sid')) {
          connectCookieVal = next.trim().split('=')[1]
          // console.log("connectCookieVal", connectCookieVal)
        }
      }
      res.json({ user: safeUser, token: connectCookieVal });
    } else {
      res.json(safeUser);
    }
  });
}

exports.logout = async (req, res, next) => {
  req.session.destroy(err => {
    req.logout();
    if(err) {
      throw new YoteError("Error logging out", 500)
    } else {
      console.log("REMOVED SESSION OBJECT");
      res.status(200).json("Successfully logged out");
    }
  });
}

// required for mobile refresh
exports.getLoggedIn = (req, res) => {
  console.log('getting logged in user! ', req.user);
  res.json(req.user || null);
}

exports.updateProfile = async (req, res) => {
  let oldUser = await User.findById(req.params.id)
  if(!oldUser) {
    throw new YoteError("Could not find matching User", 404)
  }
  // oldUser = Object.assign(oldUser, req.body)
  // define specifically what fields a user can change on their own profile
  // oldUser.thing = req.body.thing;

  const user = await oldUser.save()
  .catch(err => { throw new YoteError(err) });
  res.json(user)
}

exports.requestReset = async (req, res) => {
  // see https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
  console.log(req.body)
  let user = await User.findOne({username: req.body.email})
  if(!user) throw new YoteError("Could not find matching User, please try again", 404)

  // set reset fields
  user.resetRequested = true;
  user.resetRequestedDate = new Date()
  user.resetToken = crypto.randomBytes(16).toString('hex')

  savedUser = await user.save().catch(err => { throw new YoteError('Error requesting password reset')})
  // send email
  
  // then send response
  res.json({})
}

exports.checkResetToken = async (req, res) => {
  const user = await User.findOne({resetRequested: true, resetToken: req.params.token})
  .select('+resetToken +resetRequestedDate +resetRequested')
  if(!user) throw new YoteError("Invalid Token", 404)
  
  if(new Date() - user.resetRequestedDate >= 991800000) {
    // over 30 minutes, reject
    throw new YoteError("Invalid Token", 404)
  } else {
    res.send("Success")
  }
}

exports.resetPassword = async (req, res) => {
  let user = await User.findOne({resetRequested: true, resetToken: req.params.token})
  .select('+resetToken +resetRequestedDate +resetRequested')
  if(!user) throw new YoteError("Invalid Token", 404)

  if(new Date() - user.resetRequestedDate >= 991800000) {
    // over 30 minutes, reject
    throw new YoteError("Invalid Token", 404)
  } else {

    // check and update password
    const passwordFailureCheck = User.passwordStrengthCheck(req.body.password);
    if(passwordFailureCheck) {
      throw new YoteError(`Password Strength Check Failed: ${passwordFailureCheck}`, 400)
    }
    
    const { salt, hash } = User.generatePassword(req.body.password)
    user.password_salt = salt;
    user.password_hash = hash;
    user.resetRequested = false;
    user.resetToken = crypto.randomBytes(16).toString('hex')
  
    // TODO: maybe some of the password history stuff? 
    const user = await newUser.save().catch(err => {
      throw new YoteError("Error reseting password")
    })

    // return success
    res.status(200).send("Success")
  }

}