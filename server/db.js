let mongoose = require('mongoose');
let User = require('./api/user/UserModel');
let logger = global.logger;

module.exports = function(config) {
  mongoose.Promise = global.Promise; // mongoose internal Promise library depreciated; use native
  mongoose.connect(config.db, {
    useMongoClient: true,
  });
  var db = mongoose.connection;
  db.on('error', logger.error.bind(console, 'mongo connection error'));
  db.once('open', function callback() {
    logger.debug('mongo connection opened');
  });

  // any other initial model calls
  User.createDefaults();
  Product.createDefaults();
};

// Yote models are defined below
let Product = require('./api/product/ProductModel');
