var winston = require('winston');

require('winston-mongodb').MongoDB;

// https://cloud.google.com/logging/docs/setup/nodejs
// Imports the Google Cloud client library for Winston
const LoggingWinston = require('@google-cloud/logging-winston').LoggingWinston;
// Creates a Winston Stackdriver Logging client
const loggingWinston = new LoggingWinston();

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var config = require('./config')[env];

// adapted from http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
winston.emitErrs = true;

let logger;

if(env == 'production' || env == 'staging') {

  logger = new winston.Logger({
    transports: [
      loggingWinston      
      , new winston.transports.Console({
        level: 'debug'
        , handleExceptions: true
        , json: false
        , colorize: true
      })
    ]
    , exitOnError: false
  });
} else {
  //else if dev, just log to console
  logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug'
        , handleExceptions: true
        , json: false
        , colorize: true
      })
    ]
    , exitOnError: false
  });
}

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message, encoding);
    }
};
