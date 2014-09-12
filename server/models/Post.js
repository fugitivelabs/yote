var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  , slug = require('mongoose-slug')
  ;

//define post schema
var postSchema = mongoose.Schema({
  created:                { type: Date, default: Date.now }
  , title:                { type: String, required: '{PATH} is required!', unique: true } //unique because used for the slug
  , author:               { type: ObjectId, ref: 'User'}
  , content:              { type: String, required: '{PATH} is required!' }
  , featured:             { type: Boolean, default: false }
  , status:               { type: String, enum: ['draft', 'published', 'deleted'], default: 'draft' }
  , tags:                 [String]
});

postSchema.plugin(slug(['title'], { required: true }));

Post = mongoose.model('Post', postSchema);

//post model methods
function createDefaults() {
  Post.find({}).exec(function(err, posts) {
    if(posts.length == 0) {
      Post.create({title: "Fugitive Labs Introduces Yote!", content: "A neat-o new product that helps you build apps on the MEAN stack!", featured: true});
      Post.create({title: "Fugitive Labs Launches Sprtrfrdrio!", content: "A neat-o new product that helps you migrate from Rdio to Spotify!", featured: true});
      Post.create({title: "Fugitive Labs Launches Rdrdify!", content: "A neat-o new product that helps you migrate from Spotify to Rdio!", featured: true});
      console.log("created initial post defaults");
    }
  });
}

exports.createDefaults = createDefaults;