var mongoose = require('mongoose')
  ;

//define post schema
var postSchema = mongoose.Schema({
  title:            { type: String, required: '{PATH} is required!' }
  , content:        { type: String, required: '{PATH} is required!' }
  , featured:       { type: Boolean, default: false }
  , tags:           [String]
});

Post = mongoose.model('Post', postSchema);

//post model methods
function createDefaults() {
  Post.find({}).exec(function(err, posts) {
    if(posts.length == 0) {
      Post.create({title: "Fugitive Labs Introduces Coyote!", content: "A neat-o new product that helps you build apps on the MEAN stack!", featured: true});
      Post.create({title: "Fugitive Labs Launches Sprtrfrdrio!", content: "A neat-o new product that helps you migrate from Rdio to Spotify!", featured: true});
      Post.create({title: "Fugitive Labs Launches Rdrdify!", content: "A neat-o new product that helps you migrate from Spotify to Rdio!", featured: true});
      console.log("created initial post defaults");
    }
  });
}

exports.createDefaults = createDefaults;