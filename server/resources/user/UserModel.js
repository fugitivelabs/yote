const mongoose = require('mongoose');
const apiUtils = require('../../global/api/apiUtils')

const userSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , email:                  { type: String, required: '{PATH} is required!', unique: true }
  , description:            { type: String }
});

// schema hooks
userSchema.pre('save', function() {
  // set the "updated" field automatically
  this.updated = new Date();
})
// https://mongoosejs.com/docs/middleware.html#types-of-middleware
// NOTE: we can also override some of the default mongo errors here, and replace with more specific YoteErrors

// instance methods go here
// userSchema.methods.methodName = function() {};

// model static functions go here
// userSchema.statics.staticFunctionName = function() {};
userSchema.statics.getDefault = () => {
  let defaultObj = {};
  userSchema.eachPath((path, schemaType) => {
    defaultObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defaultObj;
}

const User = mongoose.model('User', userSchema);
