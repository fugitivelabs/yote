const mongoose = require('mongoose');
const crypto = require('crypto');

const apiUtils = require('../../global/api/apiUtils')

const userSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  , username:               { type: String, required: '{PATH} is required!', unique: true }
  // , email:                  { type: String, required: '{PATH} is required!', unique: true } // tbd. possibly allow us to do phone number usernames in the future.

  // TODO: notes!
  , password_salt:  { type: String, required: '{PATH} is required!', select: false }
  , password_hash:  { type: String, required: '{PATH} is required!', select: false }

});

// schema hooks
userSchema.pre('save', function() {
  // set the "updated" field automatically
  this.updated = new Date();
})
// https://mongoosejs.com/docs/middleware.html#types-of-middleware
// NOTE: we can also override some of the default mongo errors here, and replace with more specific YoteErrors

// instance methods go here
userSchema.methods = {
  // of course I can't test any of this until I figure out register and/or reset password....

  checkPassword: function(passwordToMatch) {
    // console.log(`trying to authenticate username '${this.username}'`);
    // new crypto - password based key derivation, sha512, 2^13 interations (probably overkill)
    let hashCheck = crypto.pbkdf2Sync(passwordToMatch, this.password_salt, 8192, 64, 'sha512').toString('hex')
    return hashCheck === this.password_hash;
  }
}
// model static functions go here
userSchema.statics = {
  generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex'); // to match below
    const hash = crypto.pbkdf2Sync(password, salt, 8192, 64, 'sha512').toString('hex');
    return { salt, hash };
  }
}

const User = mongoose.model('User', userSchema);
