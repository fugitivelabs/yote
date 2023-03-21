/**
 * Data Model for Notification.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * notificationSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

const mongoose = require('mongoose');
const apiUtils = require('../../global/api/apiUtils')
let ObjectId = mongoose.SchemaTypes.ObjectId;

const notificationSchema = mongoose.Schema({
  created: { type: Date, default: Date.now }
  , updated: { type: Date, default: Date.now }

  // specific values for notification go below
  , _user: { type: ObjectId, ref: 'User' }
  , message: { type: String, required: '{PATH} is required!'}
  , link: { type: String }
  , unread: { type: Boolean, default: true }
});

// schema hooks
notificationSchema.pre('save', function() {
  // set the "updated" field automatically
  this.updated = new Date();
})
// https://mongoosejs.com/docs/middleware.html#types-of-middleware
// NOTE: we can also override some of the default mongo errors here, and replace with more specific YoteErrors

// instance methods go here
// notificationSchema.methods.methodName = function() {};

// model static functions go here
// notificationSchema.statics.staticFunctionName = function() {};
notificationSchema.statics.getDefault = () => {
  let defaultObj = {};
  notificationSchema.eachPath((path, schemaType) => {
    defaultObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defaultObj;
}

const Notification = mongoose.model('Notification', notificationSchema);
