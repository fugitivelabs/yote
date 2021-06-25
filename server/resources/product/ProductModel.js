const mongoose = require('mongoose');
const apiUtils = require('../../global/api/apiUtils')

const productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , title:                  { type: String, required: '{PATH} is required!', unique: true }
  , description:            { type: String }

});

// schema hooks
productSchema.pre('save', function() {
  // set the "updated" field automatically
  this.updated = new Date();
})
// https://mongoosejs.com/docs/middleware.html#types-of-middleware
// NOTE: we can also override some of the default mongo errors here, and replace with more specific YoteErrors

// instance methods go here
// productSchema.methods.methodName = function() {};

// model static functions go here
// productSchema.statics.staticFunctionName = function() {};
productSchema.statics.getDefault = () => {
  let defaultObj = {};
  productSchema.eachPath((path, schemaType) => {
    defaultObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defaultObj;
}

const Product = mongoose.model('Product', productSchema);
