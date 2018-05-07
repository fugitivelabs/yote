/**
 * Data Model for Post.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * productSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define post schema
const postSchema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for post go below
  , title:                  { type: String, required: '{PATH} is required!' }
  , content:                { type: String, required: '{PATH} is required!' }
  , _author:                { type: ObjectId, ref: 'User' }

});

// post instance methods go here
// postSchema.methods.methodName = function() {};

// post model static functions go here
// postSchema.statics.staticFunctionName = function() {};

const Post = mongoose.model('Post', postSchema);


// // post model methods
// function createDefaults() {
//   Post.find({}).exec(function(err, posts) {
//     if(posts.length == 0) {
//       Post.create({
//         title: "Sample Post Title!"
//         , content: "Sample post content."
//       });
//       logger.info("created initial post defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
