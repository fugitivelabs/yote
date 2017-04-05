var mongoose = require('mongoose')
  , crypto = require('crypto')
  //get secrets
  , secrets = require('../../config')[process.env.NODE_ENV].secrets
  , jwt = require('jwt-simple')
  , tokenSecret = secrets.tokenSecret //generate your own randomized token here.
  ;

//define user schema
var userSchema = mongoose.Schema({
  created:          { type: Date, default: Date.now }
  , updated:        { type: Date, default: Date.now }
  , firstName:        { type: String, required: '{PATH} is required!' }
  , lastName:       { type: String, required: '{PATH} is required!' }
  , username:       {
    type: String
    , required: '{PATH} is required!'
    , unique:true
  }
  //by default, password and reset fields are hidden from db queries. to return them, you must EXPLICITLY request them in the User.find call.
  , password_salt:  { type: String, required: '{PATH} is required!', select: false }
  , password_hash:  { type: String, required: '{PATH} is required!', select: false }
  , roles:          [{ type: String, enum: ['admin'] }]
    //reset password fields
  , resetPasswordTime:    { type: Date, default: Date.now, select: false }
  , resetPasswordHex:     { type: String, default: Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16), select: false }

  //api token fields
  , apiToken:             { type: String, select: false }
  , tokenCreated:         { type: Date, default: Date.now, select: false }
});

//user instance methods
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    console.log("trying to authenticate username '" + this.username + "'");
    return User.hashPassword(this.password_salt, passwordToMatch) === this.password_hash;
  }
  , hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
  , createToken: function(callback) {
    console.log("creating a user token");
    var token = User.encode({username: this.username});
    console.log("TOKEN: " + token);
    this.apiToken = token;
    this.tokenCreated = new Date();
    this.save(function(err, user) {
      if(err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("user token created.");
        // console.log(user);
        callback(false, user.apiToken);
      }
    });
  }
  , removeToken: function(callback) {
    //akin to 'logout' for api tokens
    console.log("REMOVE TOKEN CALLED");
    this.apiToken = null;
    this.save(function(err, user) {
      if(err) {
        callback(err, null);
      } else {
        console.log("user token removed.");
        callback(false, 'removed');
      }
    });
  }
};

//user model static methods
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
    var now = new Date();
    var diff = (now.getTime() - created);
    return diff > 86400000; //API token active for 24 hours.
    // return false; //if you want your API tokens to NEVER expire, use this line instead.
  }
};

var User = mongoose.model('User', userSchema);

// User.schema.path('roles').validate(function(roles){
//   console.log("checking roles");
//   if(roles.length == 0) {
//     roles.push(null);
//   }
//   console.log(roles);
//   var refs = [null,'admin'];
//   roles.forEach(function(role){
//     console.log("role: " + role);
//     refs.forEach(function(ref){
//       if(ref==role) {
//         valid = true;
//         return;
//       }
//     });
//     if(!valid) {
//       return false;
//     }
//   });
//   return roles.length > 0;
// }, 'roles not valid');


//user model methods
function createDefaults() {
  User.find({}).exec(function(err, users) {
    if(users.length === 0) {
      var password_salt, password_hash;
      password_salt = User.createPasswordSalt();
      password_hash = User.hashPassword(password_salt, 'admin');
      User.create({firstName:'Admin', lastName:'Admin', username:'admin@admin.com', password_salt: password_salt, password_hash: password_hash, roles: ['admin']});
      logger.info("created initial default user w/ username 'admin' and password 'admin'");
    }
  });
};

exports.createDefaults = createDefaults;
