/**
 * Sever-side controllers for Product.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Product
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still have to make sure to account for
 * any model changes on the client
 */

let Product = require('mongoose').model('Product');

exports.list = (req, res) => {
  // paginate on the server
  if(req.query.page) {
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
    logger.info('list all products');
    Product.find({}).exec((err, products) => {
      if(err || !products) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, products: products });
      }
    });
  }
}

exports.search = (req, res) => {
  // search by query parameters
  // NOTE: It's up to the front end to make sure the params exist on the model
  let mongoQuery = {};
  let page, per;
  
  for(key in req.query) {
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
      res.send({ success: false, message: err });
    } else if(!product) {
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
      // now edit the updated date
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
