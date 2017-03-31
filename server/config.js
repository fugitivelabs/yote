let path = require('path');
let rootPath = path.normalize(__dirname + '/../../');

let secrets = require('./secrets.js');

let devUrl = "localhost:3030";
let prodUrl = "localhost:3030"; // this should match your production instance

// NOTE: this is the name of your Mongo database.  It should ideally match the project name.
let dbName = "yote";

// TODO:  document the remoteDb envirnment variable below
// option to set database location manually via environment variables
let remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;

module.exports = {
  development: {
    appUrl: devUrl
    , db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : `mongodb://localhost/${dbName}`
    , httpsOptional: true
    , port: process.env.PORT || 3030
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false

  }
  , production: {
    appUrl: prodUrl
    , db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : `mongodb://localhost/${dbName}`
    , httpsOptional: true
    , port: process.env.PORT || 80
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
}
