var Post = require('mongoose').model('Post')
  ;

exports.list = function(req, res) {
  console.log('list posts');
  Post.find({}).populate('author').exec(function(err, posts) {
    res.send(posts);
  });
}

exports.getById = function(req, res) {
  console.log('get post by id');
  Post.findOne({_id:req.params.id}).exec(function(err, post) {
    if(err || !post) {
      res.send({success: false, message: err});
    } else {
      res.send({success: true, post: post});
    }
  });
}

exports.getBySlug = function(req, res) {
  console.log('get post by slug');
  Post.findOne({ slug: req.param('slug') }).exec(function(err, post) {
    if(err || !post) {
      res.send({success: false, message: err});
    } else {
      res.send({success: true, post: post});
    }
  });
}

exports.create = function(req, res) {
  var post = new Post({});
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      post[k] = req.body[k];
    }
  }
  post.save(function(err, post) {
    if(err || !post) {
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
    if(err || !post)  {
      console.log("post not found");
      res.send({success: false, message: "Post Not Found; Edit Failed."});
    } else {
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          post[k] = req.body[k];
        }
      }
      post.save(function(err, post) {
        if(err || !post) {
          console.log("ERROR UPDATING: " + err);
          res.send({success: false, error: err});
        } else {
          res.send({success: true, post: post});
        }
      });
    }
  });
}

exports.delete = function(req, res) {
  res.send("DELETE ACTION NOT IMPLEMENTED YET");
}

