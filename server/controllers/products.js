/***********************************************************

Sever-side controllers for Product.  

By default, Yote's server controllers are dynamic relative 
to their models -- i.e. if you add fields to the Product
model, the create and update controllers below will respect
the new schema.

NOTE: make sure to account for any model changes 
on the client

***********************************************************/

var Product = require('mongoose').model('Product')
  ;

exports.list = (req, res) => {
  if(req.query.page) {
    console.log('list products with pagination');
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Product.find({}).skip((page-1)*per).limit(per).exec((err, products) => {
      if(err || !products) {
        res.send({success: false, message: err});
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
    console.log('list products');
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
  //search by query parameters
  // up to front end to make sure the params exist on the model
  console.log("searching for products with params.");
  var mongoQuery = {};
  var page, per;
  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = parseInt(req.query.page);
      } else if(key == "per") {
        per = parseInt(req.query.per);
      } else {
        console.log("found search query param: " + key);
        mongoQuery[key] = req.query[key];
      }
    }
  }
  if(page || per) {
    console.log("searching for products with pagination");
    console.log(mongoQuery);
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
    console.log(mongoQuery);
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
  console.log('get product by id');
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
  console.log('creating new product');
  var product = new Product({});
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
      console.log("created new product");
      res.send({ success: true, product: product });
    }
  });
}

exports.update = (req, res) => {
  console.log('updating product');
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
  console.log("deleting product");
  Product.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted product" });
    }
  });
}