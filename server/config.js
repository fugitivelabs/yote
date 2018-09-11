const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

const secrets = require('./secrets.js');

/**
 * NOTE: urls should omit http(s)://
 */
const devUrl = "localhost:3031";
const prodUrl = "localhost:3031"; // this should match your production instance
const stagingUrl = "localhost:3031"; // this should match your

// NOTE: this is the name of your Mongo database.  It should ideally match the project name.
const devDbName = "yote"; //note: removed the capital S
const stagingDbName = "yote-staging";
const productionDbName = "yote";

// TODO:  document the remoteDb envirnment variable below
// option to set database location manually via environment variables
const remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;

// set database uri's
const devDbUri = `mongodb://localhost/${devDbName}`
const stagingDbUri = devDbUri;
// const stagingDbUri = `mongodb+srv://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@${envSecrets.mongo_prefix}.gcp.mongodb.net/${productionDbName}`
const productionDbUri = devDbUri;
// const productionDbUri = `mongodb+srv://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@${envSecrets.mongo_prefix}.gcp.mongodb.net/${productionDbName}`



module.exports = {
  development: {
    appUrl: devUrl
    , db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : devDbUri
    , httpsOptional: true
    , port: process.env.PORT || 3031
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
  , production: {
    appUrl: prodUrl
    , db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : productionDbUri
    , httpsOptional: true
    , port: process.env.PORT || 80
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
  , staging: {
    appUrl: stagingUrl
    , db: remoteDb ? `mongodb://${remoteDb}/${dbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${dbName}` : stagingDbUri
    , httpsOptional: true
    , port: process.env.PORT || 3031 // so you can still run it locally
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
}
