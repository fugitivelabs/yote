var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose')
  ;

var UserSchema = new Schema({
  //username - added by passport-local-mongoose
  //password - added by passport-local-mongoose
  created:        { type: Date, required: true, default: Date.now }
  , firstname:    { type: String, required: false }
  , lastName:   { type: String, required: false }
  , roles:      [String]
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods = {
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};