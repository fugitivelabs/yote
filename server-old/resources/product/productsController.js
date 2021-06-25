/**
 * Sever-side controllers for Product.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Product
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let Product = require('mongoose').model('Product');
let logger = global.logger;

exports.list = async (req, res, next) => {
  console.log("TESTING LIST 1")
  let query = {}
  // let query = "break me"
  const products = await Product.find(query)
  console.log("TESTING LIST 2")

  throw Error({msg: "product error"})
  
  if(products) {
    console.log("products", products)
  } else {
    console.log("not products?")
  }  // // list all products
  // Product.find({}).exec((err, products) => {
  //   if(err || !products) {
  //     res.send({ success: false, message: err });
  //   } else {
  //     res.send({ success: true, products: products });
  //   }
  // });
}


exports.listOld = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Product.find({}).skip((page-1)*per).limit(per).exec((err, products) => {
      if(err || !products) {
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , products: products
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all products
    Product.find({}).exec((err, products) => {
      if(err || !products) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, products: products });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of products queried from the array of _id's passed in the query param
   *
   * NOTES:
   * 1) looks like the best syntax for this is, "?id=1234&id=4567&id=91011"
   *    still a GET, and more or less conforms to REST uri's
   *    additionally, node will automatically parse this into a single array via "req.query.id"
   * 2) node default max request headers + uri size is 80kb.
   *    experimentation needed to determie what the max length of a list we can do this way is
   * TODO: server side pagination
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    // // as in listByRef below, attempt to query for matching ObjectId keys first. ie, if "user" is passed, look for key "_user" before key "user"
    // Product.find({["_" + req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, products) => {
    //     if(err || !products) {
    //       res.send({success: false, message: `Error querying for products by ${["_" + req.params.refKey]} list`, err});
    //     } else if(products.length == 0) {
    //       Product.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, products) => {
    //         if(err || !products) {
    //           res.send({success: false, message: `Error querying for products by ${[req.params.refKey]} list`, err});
    //         } else {
    //           res.send({success: true, products});
    //         }
    //       })
    //     } else  {
    //       res.send({success: true, products});
    //     }
    // })
    Product.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, products) => {
        if(err || !products) {
          res.send({success: false, message: `Error querying for products by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, products});
        }
    })
  }
}

exports.listByRefs = (req, res) => {
  /**
   * NOTE: This let's us query by ANY string or pointer key by passing in a refKey and refId
   * TODO: server side pagination
   */

   // build query
  let query = {
    [req.params.refKey]: req.params.refId === 'null' ? null : req.params.refId
  }
  // test for optional additional parameters
  const nextParams = req.params['0'];
  if(nextParams.split("/").length % 2 == 0) {
    // can't have length be uneven, throw error
    // ^ annoying because if you lead with the character you are splitting on, it puts an empty string first, so while we want "length == 2" technically we need to check for length == 3
    res.send({success: false, message: "Invalid parameter length"});
  } else {
    if(nextParams.length !== 0) {
      for(let i = 1; i < nextParams.split("/").length; i+= 2) {
        query[nextParams.split("/")[i]] = nextParams.split("/")[i+1] === 'null' ? null : nextParams.split("/")[i+1]
      }
    }
    Product.find(query, (err, products) => {
      if(err || !products) {
        res.send({success: false, message: `Error retrieving products by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, products})
      }
    })
  }
}

exports.search = (req, res) => {
  // search by query parameters
  // NOTE: It's up to the front end to make sure the params match the model
  let mongoQuery = {};
  let page, per;

  for(const key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = parseInt(req.query.page);
      } else if(key == "per") {
        per = parseInt(req.query.per);
      } else {
        logger.debug("found search query param: ", key);
        mongoQuery[key] = req.query[key];
      }
    }
  }

  logger.info(mongoQuery);
  if(page || per) {
    page = page || 1;
    per = per || 20;
    Product.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, products) => {
      if(err || !products) {
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , products: products
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    Product.find(mongoQuery).exec((err, products) => {
      if(err || !products) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, products: products });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get product by id');
  Product.findById(req.params.id).exec((err, product) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!product) {
      res.send({ success: false, message: "Product not found." });
    } else {
      res.send({ success: true, product: product });
    }
  });
}

exports.getSchema = (req, res) => {
  /**
   * This is admin protected and useful for displaying REST api documentation
   */
  logger.info('get product schema ');
  res.send({success: true, schema: Product.getSchema()});
}
 exports.getDefault = (req, res) => {
  /**
   * This is an open api call by default (see what I did there?) and is used to
   * return the default object back to the Create components on the client-side.
   *
   * NOTE: uses /global/utils/api.js to return default values IF defined on the model.
   * will otherwise return null. 
   */
  logger.info('get product default object');
  res.send({success: true, defaultObj: Product.getDefault()});
}

exports.create = (req, res) => {
  logger.info('creating new product');
  let product = new Product({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      product[k] = req.body[k];
    }
  }

  product.save((err, product) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!product) {
      logger.error("ERROR: Could not create Product")
      res.send({ success: false, message: "Could not create Product." });
    } else {
      logger.info("created new product");
      res.send({ success: true, product: product });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating product');
  Product.findById(req.params.id).exec((err, product) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!product) {
      res.send({ success: false, message: "Product not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          product[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      product.updated = new Date();
      product.save((err, product) => {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!product) {
          res.send({ success: false, message: "Could not save product."});
        } else {
          res.send({ success: true, product: product });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting product");
  Product.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted product" });
    }
  });
}
