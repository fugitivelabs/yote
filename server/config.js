var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var secrets = require('./secrets.js');

//change this to change the name of your mongodb database name
var dbName = "yote";
//option to set database location manually via environment variables
var remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;

module.exports = {
  development: {
    // db: process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/" + dbName : 'mongodb://localhost/' + dbName
    db: remoteDb ? 'mongodb://' + remoteDb + '/' + dbName : process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/" + dbName : 'mongodb://localhost/' + dbName
    , rootPath: rootPath
    , port: process.env.PORT || 3030
    , secrets: secrets || {}
    , useHttps: false
    , httpsOptional: true
  }
  , production: {
    db: remoteDb ? 'mongodb://' + remoteDb + '/' + dbName : process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/" + dbName : 'mongodb://localhost/' + dbName
    , rootPath: rootPath
    , port: process.env.PORT || 80
    , secrets: secrets || {}
    , useHttps: false
    , httpsOptional: true
  }
}
