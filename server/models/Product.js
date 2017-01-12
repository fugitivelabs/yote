/***********************************************************

Model for Product.

By default, Yote's server controllers are dynamic relative
to their models -- i.e. if you add properties to the
productSchema below, the create and update controllers
will respect the updated model.

NOTE: make sure to account for any model changes
on the client

***********************************************************/

var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  ;

// define product schema
var productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , title:                  { type: String, required: '{PATH} is required!' }
  , description:            { type: String }
});

// product instance methods go here
// productSchema.methods.methodName = function() {};

// product model static functions go here
// productSchema.statics.staticFunctionName = function() {};

var Product = mongoose.model('Product', productSchema);
