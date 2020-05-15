/**
 * Wrapper to help write utility scripts
 */

console.log("loading util wrapper");

// initialize logger
let logger = require('../logger');
global.logger = logger;

//require libs
let mongoose  = require('mongoose');
let ObjectId  = mongoose.Types.ObjectId;
let async     = require('async');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const secrets = require('../secrets')[env]

// by requiring the models here, we can have them init-ed for the individual utils if needed
let UserModel = require('../resources/user/UserModel');
let ProductModel = require('../resources/product/ProductModel');

exports.run = runFn => {

  //load config and attach database
  let connectionOptions = {};

  if(config.db.includes('mongodb+srv')) {
    console.log("USING MONGO+SRV, need to manually set dbName");
    connectionOptions = { dbName: config.dbName }
    // https://github.com/Automattic/mongoose/issues/6106
  }

  mongoose.connect(config.db, connectionOptions);
  let db = mongoose.connection;

  db.on('error', () => {
    console.log("Mongo connection error");
    process.exit(1);
  })
  db.once('open', () => {
    console.log('Mongo connection opened');
    runFn(config, secrets); // optional params in case the util needs them
  });

}