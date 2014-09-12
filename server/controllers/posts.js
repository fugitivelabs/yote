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
  Post.findOne({ slug: req.param('slug') }).exec(function(err, post) {
    res.send(post);
  });
}

exports.create = function(req, res) {
  var post = new Post({
    title: req.param('title')
    , author: req.param('author')
    , content: req.param('content')
    , tags: req.param('tags')
  }).save(function(err, post) {
    if(err) {
      res.send({success: false, message: err});
    } else {
      console.log("created new post");
      res.send({success: true, post: post});
    }
  })
}

exports.update = function(req, res) {
  console.log("update post called");
  Post.findOne({ slug: req.param('slug') }).exec(function(err, post) {
    if(!err) {
      post.title = req.param('title');
      post.content = req.param('content');
      // post.status = req.param('status');
      // post.tags = req.params('tags');
      // post.featured = req.params('featured');
      post.save(function(err, post) {
        if(!err) {
          res.send({success: true, post: post});
        } else {
          console.log("ERROR UPDATING: " + err);
          res.send({success: false, error: err});
        }
      });

    } else {
      console.log("post not found");
      res.send({success: false, message: "Post Not Found; Edit Failed."});
    }
  });
}

exports.delete = function(req, res) {
  res.send("DELETE ACTION NOT IMPLEMENTED YET");
}

