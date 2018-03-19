let mongoose = require('mongoose');
let User = require('./resources/user/UserModel');
let logger = global.logger;

module.exports = function(config) {
  mongoose.Promise = global.Promise; // mongoose internal Promise library depreciated; use native
  // console.log("DB CONNECTION:", config.db);
  let connectionOptions = {};
  if(config.db.includes('mongodb+srv')) {
    console.log("USING MONGO+SRV, need to manually set dbName");
    connectionOptions = { dbName: config.dbName }
    // https://github.com/Automattic/mongoose/issues/6106
  }
  mongoose.connect(config.db, connectionOptions);
  let db = mongoose.connection;

  db.on('error', logger.error.bind(console, 'mongo connection error'));
  db.once('open', () => {
    logger.debug('mongo connection opened');
  });

  // any other initial model calls
  User.createDefaults();
  Product.createDefaults();
};

// Yote models are defined below
let Product = require('./resources/product/ProductModel');
