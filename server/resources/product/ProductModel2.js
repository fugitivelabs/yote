const knex = require('knex')
const { Model } = require('objection')

Model.knex(db)

console.log("***** LOADING PRODUCT MODEL 2")

// LOTS MORE NOTES, SEE https://vincit.github.io/objection.js/guide/models.html#examples

class Product extends Model {

  static get tableName() {
    return 'products'
  }

  static get idColumn() {
    // manually set this to interact better with yote front end
    return '_id';
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    // see https://github.com/Vincit/objection.js/blob/master/examples/express-es6/models/Animal.js
    return {
      type: 'object',
      required: ['title'],
      properties: {
        _id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  static get relationMappings() {
    return {
      // TODO: see above as well. can use for joins and stuff
    }
  }

  // static test() {
  // // ex. static method, like we will need in the users model
  //   return " 2TEST TEST TEST"
  // }

}


module.exports = Product;