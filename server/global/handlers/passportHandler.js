const UserSchema = require('../../resources/user/UserModel')
const User = require('mongoose').model('User');
const YoteError = require('../../global/helpers/YoteError');
let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// TODO: once working, redo for new asyncs

// define strategies
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    var projection = {
      username: 1, password_salt: 1, password_hash: 1, roles: 1
    }
    // console.log("TESTING", username, password)
    User.findOne({username}, projection).exec((err, user) => {
      if(user && user.checkPassword(password)) {
        console.log("authenticated!");
        return done(null, user);
      } else {
        console.log("NOT authenticated");
        return done(null, false);
      }
    })
  }
));
// other user auth strategies defined here

passport.serializeUser((user, cb) => {
  // logger.warn("SERIALIZE USER");
  if(user) {
    cb(null, user._id);
  }
});

passport.deserializeUser((id, cb) => {
  // logger.warn("DESERIALIZE USER");
  // NOTE: we want mobile user to have access to their api token, but we don't want it to be select: true
  User.findOne({_id: id}).exec((err, user) => {
    if(user) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  })
})

exports.passport = passport;