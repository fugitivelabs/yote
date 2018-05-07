/**
 * Sever-side controllers for Post.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Post
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let Post = require('mongoose').model('Post');

exports.list = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Post.find({}).skip((page-1)*per).limit(per).exec((err, posts) => {
      if(err || !posts) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , posts: posts
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all posts
    Post.find({}).exec((err, posts) => {
      if(err || !posts) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, posts: posts });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of posts queried from the array of _id's passed in the query param
   *
   * NOTES:
   * node default max request headers + uri size is 80kb.
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    Post.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, posts) => {
        if(err || !posts) {
          res.send({success: false, message: `Error querying for posts by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, posts});
        }
    })
  }
}

exports.listByRefs = (req, res) => {
  /**
   * NOTE: This let's us query by ANY string or pointer key by passing in a refKey and refId
   */

   // build query
  let query = {
    [req.params.refKey]: req.params.refId === 'null' ? null : req.params.refId
  }
  // test for optional additional parameters
  const nextParams = req.params['0'];
  if(nextParams.split("/").length % 2 == 0) {
    // can't have length be uneven, throw error
    res.send({success: false, message: "Invalid parameter length"});
  } else {
    if(nextParams.length !== 0) {
      for(let i = 1; i < nextParams.split("/").length; i+= 2) {
        query[nextParams.split("/")[i]] = nextParams.split("/")[i+1] === 'null' ? null : nextParams.split("/")[i+1]
      }
    }
    Post.find(query, (err, posts) => {
      if(err || !posts) {
        res.send({success: false, message: `Error retrieving posts by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, posts})
      }
    })
  }
}

exports.search = (req, res) => {
  // search by query parameters
  // NOTE: It's up to the front end to make sure the params match the model
  let mongoQuery = {};
  let page, per;

  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = parseInt(req.query.page);
      } else if(key == "per") {
        per = parseInt(req.query.per);
      } else {
        logger.debug("found search query param: " + key);
        mongoQuery[key] = req.query[key];
      }
    }
  }

  logger.info(mongoQuery);
  if(page || per) {
    page = page || 1;
    per = per || 20;
    Post.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, posts) => {
      if(err || !posts) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , posts: posts
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    Post.find(mongoQuery).exec((err, posts) => {
      if(err || !posts) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, posts: posts });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get post by id');
  Post.findById(req.params.id).exec((err, post) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!post) {
      logger.error("ERROR: Post not found.");
      res.send({ success: false, message: "Post not found." });
    } else {
      res.send({ success: true, post: post });
    }
  });
}

exports.create = (req, res) => {
  logger.info('creating new post');
  let post = new Post({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      post[k] = req.body[k];
    }
  }

  // associate new posts with the logged in user.
  post._author = req.user._id;

  post.save((err, post) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!post) {
      logger.error("ERROR: Could not create Post.");
      res.send({ success: false, message: "Could not create Post." });
    } else {
      logger.info("created new post");
      res.send({ success: true, post: post });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating post');
  Post.findById(req.params.id).exec((err, post) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!post) {
      logger.error("ERROR: Post not found.");
      res.send({ success: false, message: "Post not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          post[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      post.updated = new Date();
      post.save((err, post) => {
        if(err) {
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!post) {
          logger.error("ERROR: Could not save post.");
          res.send({ success: false, message: "Could not save post."});
        } else {
          res.send({ success: true, post: post });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting post");
  Post.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted post" });
    }
  });
}
