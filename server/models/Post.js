var mongoose = require('mongoose')
  ;

//define product schema
var postSchema = mongoose.Schema({
  title:            { type: String, required: '{PATH} is required!' }
  , content:        { type: String, required: '{PATH} is required!' }
  , featured:       { type: Boolean, default: false }
  , tags:           [String]
});

Post = mongoose.model('Post', postSchema);

//product model methods
function createDefaults() {
  Post.find({}).exec(function(err, posts) {
    if(posts.length == 0) {
      Post.create({title: "Fugitive Labs Introduces Coyote!", description: "A neat-o new product that helps you build apps on the MEAN stack!", featured: true});
      console.log("created initial post defaults");
    }
  });
}

exports.createDefaults = createDefaults;