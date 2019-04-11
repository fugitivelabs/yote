const knex = require('knex')
const { Model } = require('objection')

Model.knex(db)

console.log("***** LOADING PRODUCT MODEL 2")

class Product extends Model {

  static get tableName() {
    return 'products'
  }

  static get jsonSchema() {
    // see https://github.com/Vincit/objection.js/blob/master/examples/express-es6/models/Animal.js
    return {}
  }

  static get relationMappings() {
    return {
      // TODO: see above as well 
    }
  }

  // static test() {
  // // ex. static method, like we will need in the users model
  //   return " 2TEST TEST TEST"
  // }

}


module.exports = Product;