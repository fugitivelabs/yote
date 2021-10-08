
/**
 * NOTE: this is a terrible name for the controller but best I could think of so far
 * 
 * GOAL: split the "standard" user crud stuff and the "logged in user" specific stuff
 * incl login, logout, register
 * also includes stuff like profile, password reset, etc
 */

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
            }

            // check for mobile vs web login
            if(req.body.mobile == true) {
              req.session.mobile = true;

              // find token and send back with user
              let splitCookies = req.headers.cookie.split(';');
              let connectCookieVal;
              for(let next of splitCookies) {
                if(next.includes('connect.sid')) {
                  connectCookieVal = next.trim().split('=')[1]
                  // console.log("connectCookieVal", connectCookieVal)
                }
              }
              res.json({user, token: connectCookieVal});

            } else {
              req.session.mobile = false;
              // send back user
              res.json(user);
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

  // TODO: make better
  // extremely simple validation
  if(!( /(.+)@(.+){2,}\.(.+){2,}/.test(newUser.username) )) {
    // res.send({ success: false, message: "Invalid email address." });
    throw new YoteError("Invalid email address", 400)

  } else if(req.body.password.length <= 6) {
    // res.send({ success: false, message: "Password not long enough. Min 6 characters." });
    throw new YoteError("Password not long enough. Min 6 characters", 400)
  } else {
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

      // check for mobile vs web login
      if(req.body.mobile == true) {
        req.session.mobile = true;

        // find token and send back with user
        let splitCookies = req.headers.cookie.split(';');
        let connectCookieVal;
        for(let next of splitCookies) {
          if(next.includes('connect.sid')) {
            connectCookieVal = next.trim().split('=')[1]
            // console.log("connectCookieVal", connectCookieVal)
          }
        }
        res.json({safeUser, token: connectCookieVal});

      } else {
        req.session.mobile = false;
        // send back user
        res.json(safeUser);
      }
    })
  }
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

// NOTE: No longer required on web. Should probably remove it.
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