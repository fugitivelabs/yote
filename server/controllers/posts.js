var Post = require('mongoose').model('Post')
  ;

exports.list = function(req, res) {
  console.log('list posts');
  Post.find({}).exec(function(err, posts) {
    res.send(posts);
  });
}

exports.getById = function(req, res) {
  console.log('get post by id');
  Post.findOne({_id:req.params.id}).exec(function(err, post) {
    res.send(post);
  });
}

exports.getBySlug = function(req, res) {
  console.log('get post by slug');
  Post.findOne({slug: req.param('slug')}).exec(function(err, post) {
    res.send(post);
  })
}

// exports.create = function(req, res) {
//   var Post = new Post({

//   });
// }