
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
  console.log("TRYING TO LOG IN")
  if(req.body.username == undefined) {
    res.send({ success: false, message: "No username present." });
  } else {
    req.body.username = req.body.username.toLowerCase();
    passport.authenticate('local', {session: true},  async (err, passportUser) => {
      if(err) {
        console.log("ERR", err)
        res.send({ success:false, message: "Error authenticating user." });
      } else if(!passportUser) {
        res.send({ success:false, message: "Matching user not found." });
      } else {
        // User is authenticted. Now get actual user data from the db and log them in
        const user = await User.findById(passportUser._id)
        if(!user) {
          res.send({ success: false, message: "Error logging user in." });
        } else {
          req.logIn(user, err => {
            if(err) { return next(err);}
            res.send({ success: true, user });
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
  if (!( /(.+)@(.+){2,}\.(.+){2,}/.test(newUser.username) )) {
    callback({ success: false, message: "Invalid email address." });
  } else if(req.body.password.length <= 6) {
    callback({ success: false, message: "Password not long enough. Min 6 characters." });
  } else {
    const { salt, hash } = User.generatePassword(req.body.password)
    newUser.password_salt = salt;
    newUser.password_hash = hash;

    // TODO: maybe some of the password history stuff? 
    const user = await newUser.save()
    res.json(user)
  }
}

exports.updateSingleById = async (req, res) => {
  let oldUser = await User.findById(req.params.id)
  if(!oldUser) {
    throw new YoteError("Could not find matching User", 404)
  }
  oldUser = Object.assign(oldUser, req.body)
  const user = await oldUser.save()
  res.json(user)

}