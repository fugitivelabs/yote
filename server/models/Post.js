/***********************************************************

Model for Post.

By default, Yote's server controllers are dynamic relative
to their models -- i.e. if you add properties to the
postSchema below, the create and update controllers
will respect the updated model.

NOTE: make sure to account for any model changes
on the client

***********************************************************/

var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  , slug = require('mongoose-url-slugs')
  ;

// define post schema
var postSchema = mongoose.Schema({
  created:                { type: Date, default: Date.now }
  , updated:              { type: Date, default: Date.now }
  , title:                { type: String, required: '{PATH} is required!', unique: true } //unique because used for the slug
  , author:               { type: ObjectId, ref: 'User'}
  , content:              { type: String, required: '{PATH} is required!' }
  , featured:             { type: Boolean, default: false }
  , status:               { type: String, enum: ['draft', 'published', 'deleted'], default: 'draft' }
  , tags:                 [String]
});

// An example of how one would implement a slug into their model
postSchema.plugin(slug(['title'], { update: true }));

// post instance methods go here
// postSchema.methods.methodName = function() {};

// post model static functions go here
// postSchema.statics.staticFunctionName = function() {};

Post = mongoose.model('Post', postSchema);

// post model methods
var User = require('mongoose').model('User');
function createDefaults() {
  User.find({}).limit(1).exec(function(err, users) {
    if(users.length === 0) {
      var password_salt, password_hash;
      password_salt = User.createPasswordSalt();
      password_hash = User.hashPassword(password_salt, 'cheesecakesuprise');
      User.create({firstName:'Yote', lastName:'Author', username:'author@yote.org', password_salt: password_salt, password_hash: password_hash, roles: []}, function(err, user) {

        logger.info("created initial default user w/ username 'author@yote.org'")

        Post.find({}).exec(function(err, posts) {
          if(posts.length == 0) {
            Post.create({title: "Fugitive Labs Introduces Yote!", content: "A neat-o new product that helps you build apps on the MEAN stack!", featured: true, author: user._id });
            logger.info("created initial post defaults");
          }
        });
      });

    } else {

      Post.find({}).exec(function(err, posts) {
        if(posts.length == 0) {
          Post.create({title: "Fugitive Labs Introduces Yote!", content: "A neat-o new product that helps you build apps on the MEAN stack!", featured: true, author: users[0]._id });
          logger.info("created initial post defaults");
        }
      });
    }

  })
}

exports.createDefaults = createDefaults;
