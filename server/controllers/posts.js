var Post = require('mongoose').model('Post')
  ;

exports.list = function(req, res) {
  Post.find({}).exec(function(err, posts) {
    res.send(posts);
  });
};

exports.getById = function(req, res) {
  Post.findOne({_id:req.params.id}).exec(function(err, post) {
    res.send(post);
  });
}