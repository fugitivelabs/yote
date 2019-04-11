/**
 * NOTE: to @grant maybe we should change this to env.js and have it live in a
 * top level directory called /config/
 */ 

const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

const secrets = require('./secrets.js');
const envSecrets = secrets[process.env.NODE_ENV];

/**
 * NOTE: urls should omit http(s)://
 */
const devUrl = "localhost:3030";
const prodUrl = "localhost:3030"; // this should match your production instance
const stagingUrl = "localhost:3030"; // this should match your

// NOTE: this is the name of your Mongo database.  It should ideally match the project name.
const devDbName = "yote"; //note: removed the capital S
const stagingDbName = "yote-staging";
const productionDbName = "yote";

/** SQL DATABASE CONNECTIONS */
module.exports = {
  development: {
    appUrl: devUrl
    // TODO: remove after testing
    , db: `mongodb://localhost/${devDbName}`

    //
    , client: 'pg'
    , connection: {
      user: 'grantfowler'
      , host: 'localhost'
      , database: 'api'
      , port: 5432
    }
    //
    , httpsOptional: true
    , port: process.env.PORT || 3030
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
  , production: {
    appUrl: prodUrl
    //TODO
    // , db: remoteDb ? `mongodb://${remoteDb}/${productionDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${productionDbName}` : productionDbUri    , httpsOptional: true
    , port: process.env.PORT || 80
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
  , staging: {
    appUrl: stagingUrl
    //TODO
    // , db: remoteDb ? `mongodb://${remoteDb}/${stagingDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${stagingDbName}` : stagingDbUri    , httpsOptional: true
    , port: process.env.PORT || 3030 // so you can still run it locally
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
}

/** MONGO DATABASE STUFF BELOW */
// option to set database location manually via environment variables in Docker
// const remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;

// // set database uri's
// const devDbUri = `mongodb://localhost/${devDbName}`
// const stagingDbUri = devDbUri;
// // const stagingDbUri = `mongodb+srv://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@${envSecrets.mongo_prefix}.gcp.mongodb.net/${productionDbName}`
// const productionDbUri = devDbUri;
// // const productionDbUri = `mongodb+srv://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@${envSecrets.mongo_prefix}.gcp.mongodb.net/${productionDbName}`

// module.exports = {
//   development: {
//     appUrl: devUrl
//     , db: remoteDb ? `mongodb://${remoteDb}/${devDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${devDbName}` : devDbUri    , httpsOptional: true
//     , port: process.env.PORT || 3030
//     , rootPath: rootPath
//     , secrets: secrets || {}
//     , useHttps: false
//   }
//   , production: {
//     appUrl: prodUrl
//     , db: remoteDb ? `mongodb://${remoteDb}/${productionDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${productionDbName}` : productionDbUri    , httpsOptional: true
//     , port: process.env.PORT || 80
//     , rootPath: rootPath
//     , secrets: secrets || {}
//     , useHttps: false
//   }
//   , staging: {
//     appUrl: stagingUrl
//     , db: remoteDb ? `mongodb://${remoteDb}/${stagingDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${stagingDbName}` : stagingDbUri    , httpsOptional: true
//     , port: process.env.PORT || 3030 // so you can still run it locally
//     , rootPath: rootPath
//     , secrets: secrets || {}
//     , useHttps: false
//   }
// }
