/**
 * Data Model for Product.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * productSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

let mongoose = require('mongoose');
// let ObjectId = mongoose.SchemaTypes.ObjectId; // use for referencing other resources
let logger = global.logger;

// define product schema
const productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , title:                  { type: String, required: '{PATH} is required!' }
  , description:            { type: String }
});

// product instance methods go here
// productSchema.methods.methodName = function() {};

// product model static functions go here
// productSchema.statics.staticFunctionName = function() {};

const Product = mongoose.model('Product', productSchema);


// prouct model methods
function createDefaults() {
  Product.find({}).exec(function(err, products) {
    if(products.length == 0) {
      Product.create({
        title: "Fugitive Labs Introduces Yote!"
        , description: "A neat-o new product that helps you build apps on the super-stack!"
      });
      logger.info("created initial product defaults");
    }
  });
}

exports.createDefaults = createDefaults;
