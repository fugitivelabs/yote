const knex = require('knex')
const { Model } = require('objection')

// get application secrets
let secrets = require('../../config')[process.env.NODE_ENV].secrets;
let tokenSecret = secrets.tokenSecret; // Or generate your own randomized token here.
let crypto = require('crypto');

Model.knex(db)

console.log("***** LOADING USER MODEL 2")

class User extends Model {

  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return '_id';
  }

  static get jsonSchema() {
    // see https://github.com/Vincit/objection.js/blob/master/examples/express-es6/models/Animal.js
    return {
      type: 'object',
      required: ['username'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }

  static get relationMappings() {
    return {
      // TODO: see above as well. can use for joins and stuff
    }
  }

  // USER MODEL FUNCTIONS
  // TODO: token stuff for mobile

  static hasRole(user, role) {
    return user.role.includes(role)
  }

  static authenticate(user, password) {
    return this.hashPassword(user.password_salt, password) === user.password_hash;
  }

  static createPasswordSalt() {
    return crypto.randomBytes(256).toString('base64');
  }

  static hashPassword(salt, password) {
    if(salt && password) {
      var hmac = crypto.createHmac('sha1', salt);
      return hmac.update(password).digest('hex');
    } else {
      return false;
    }
  }
  



}


module.exports = User;