/**
 * Define the User data model.
 *
 * NOTE: User has some special cases over generic resource modules to account for
 * various authentication issues and whatnot.
 */

// get application secrets
let secrets = require('../../config')[process.env.NODE_ENV].secrets;
let tokenSecret = secrets.tokenSecret; // Or generate your own randomized token here.

let crypto = require('crypto');
let jwt = require('jwt-simple');
let mongoose = require('mongoose');
let logger = global.logger;

// define the User schema
let userSchema = mongoose.Schema({
  created:            { type: Date, default: Date.now }
  , updated:          { type: Date, default: Date.now }
  , firstName:        { type: String, required: '{PATH} is required!' }
  , lastName:         { type: String, required: '{PATH} is required!' }
  , username:         {
    type: String
    , required: '{PATH} is required!'
    , unique: true
  }

  /**
   * Password & API token fields
   * NOTE: by default, password and reset fields are hidden from db queries.
   * To return them, you must EXPLICITLY request them in the User.find call.
   */

  // crypto-stored password
  , password_salt:  { type: String, required: '{PATH} is required!', select: false }
  , password_hash:  { type: String, required: '{PATH} is required!', select: false }
  , roles:          [{ type: String, enum: ['admin'] }]

  // Reset password fields
  , resetPasswordTime:    { type: Date, default: Date.now, select: false }
  , resetPasswordHex:     { type: String, default: Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16), select: false }

  // API token fields
  , apiToken:             { type: String, select: false }
  , tokenCreated:         { type: Date, default: Date.now, select: false }
});

// user instance methods
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    logger.info(`trying to authenticate username '${this.username}'`);
    return User.hashPassword(this.password_salt, passwordToMatch) === this.password_hash;
  }
  , hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
  , createToken: function(callback) {
    logger.info("creating a user token");
    var token = User.encode({username: this.username});
    logger.info("TOKEN: ", token);
    this.apiToken = token;
    this.tokenCreated = new Date();
    this.save(function(err, user) {
      if(err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info("user token created.");
        callback(false, user.apiToken);
      }
    });
  }
  , removeToken: function(callback) {
    // NOTE: This is akin to 'logout' for api tokens
    logger.warn("REMOVE TOKEN CALLED");
    this.apiToken = null;
    this.save(function(err, user) {
      if(err || !user) {
        callback(err, null);
      } else {
        logger.info("user token removed.");
        callback(false, 'removed');
      }
    });
  }
};

// user model static methods
userSchema.statics = {
  createPasswordSalt: function() {
    return crypto.randomBytes(256).toString('base64');
  }
  , hashPassword: function(salt, password) {
    if(salt && password) {
      var hmac = crypto.createHmac('sha1', salt);
      return hmac.update(password).digest('hex');
    } else {
      return false;
    }
  }
  , encode: function(data) {
    return jwt.encode(data, tokenSecret);
  }
  , decode: function(data) {
    return jwt.decode(data, tokenSecret);
  }
  , tokenExpired: function(created) {
    // NOTE: if you want your API token to expire, use the following:
    var now = new Date();
    var diff = (now.getTime() - created);
    return diff > 86400000; // API token will be active for 24 hours.

    // Otherwise, if you want your API tokens to NEVER expire, use this line instead:
    // return false;
  }
};

var User = mongoose.model('User', userSchema);

// user model methods
function createDefaults() {
  User.find({}).exec(function(err, users) {
    if(err || !users) {
      logger.error("ERROR finding default users", err);
    } else if(users.length === 0) {
      var password_salt, password_hash;
      password_salt = User.createPasswordSalt();
      password_hash = User.hashPassword(password_salt, 'admin');
      User.create({
        firstName:'Admin'
        , lastName:'Admin'
        , username:'admin@admin.com'
        , password_salt: password_salt
        , password_hash: password_hash
        , roles: ['admin']
      });
      logger.info("created initial default user w/ username 'admin@admin.com' and password 'admin'");
    }
  });
}

exports.createDefaults = createDefaults;
