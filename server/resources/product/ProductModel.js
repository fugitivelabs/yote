const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , title:                  { type: String, required: '{PATH} is required!', unique: true }
  , description:            { type: String }
  , status:                 { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' }
});

// product instance methods go here
// productSchema.methods.methodName = function() {};

// product model static functions go here
// productSchema.statics.staticFunctionName = function() {};

const Product = mongoose.model('Product', productSchema);
