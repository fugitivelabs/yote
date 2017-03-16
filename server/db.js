var mongoose = require('mongoose')
  , User = require('./resources/users/UserModel')
  ;

module.exports = function(config) {
  mongoose.Promise = global.Promise; //mongoose internal Promise library depreciated; use native
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongo connection error'));
  db.once('open', function callback() {
    console.log('mongo connection opened');
  });

  //any other initial model calls
  User.createDefaults();
  Product.createDefaults();
};

// new Mongoose models are defined below
var Product = require('./resources/products/ProductModel');
