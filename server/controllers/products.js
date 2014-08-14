var Product = require('mongoose').model('Product')
  ;

exports.list = function(req, res) {
  Product.find({}).exec(function(err, products) {
    res.send(products);
  });
};

exports.getById = function(req, res) {
  Product.findOne({_id:req.params.id}).exec(function(err, product) {
    res.send(product);
  });
}