let path = require('path');
let rootPath = path.normalize(__dirname + '/../../');

let secrets = require('./secrets.js');

// NOTE: this is the name of your Mongo database.  It should ideally match the project name.
let dbName = "yote";

/**
 * TODO:  document the remoteDb envirnment variable below 
 */
// option to set database location manually via environment variables
let remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;

module.exports = {
  development: {
    db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : `mongodb://localhost/${dbName}`
    , rootPath: rootPath
    , port: process.env.PORT || 3030
    , secrets: secrets || {}
    , useHttps: false
    , httpsOptional: true
  }
  , production: {
    db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : `mongodb://localhost/${dbName}`
    , rootPath: rootPath
    , port: process.env.PORT || 80
    , secrets: secrets || {}
    , useHttps: false
    , httpsOptional: true
  }
}
