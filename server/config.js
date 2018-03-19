let path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

const secrets = require('./secrets.js');
const envSecrets = secrets[process.env.NODE_ENV];

// set urls
const devUrl = "localhost:3030";
const stagingUrl = "localhost:3030";
const prodUrl = "localhost:3030"; // this should match your production instance


// set database names
// NOTE: this is the name of the Mongo database.  It should ideally match the project name and be consistent accross environments
const devDbName = "yote";
const stagingDbName = "yote";
const productionDbName = "yote";

// set database uri's
const devDbUri = `mongodb://localhost/MY_DATABASE` //${devDbName}`
//mongodb+srv://fugitivelabs:chunkybutterwalrus@test-cluster-1-rzbt6.gcp.mongodb.net/test
const stagingDbUri = `mongodb+srv://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@yote-test-2-rzbt6.gcp.mongodb.net/my_database` //${stagingDbName}`
// const stagingDbUri = `mongodb://${envSecrets.mongo_user}:${envSecrets.mongo_pass}@test-cluster-1-shard-00-00-rzbt6.gcp.mongodb.net:27017,test-cluster-1-shard-00-01-rzbt6.gcp.mongodb.net:27017,test-cluster-1-shard-00-02-rzbt6.gcp.mongodb.net:27017/${stagingDbName}?ssl=true&replicaSet=test-cluster-1-shard-0&authSource=admin`;
const productionDbUri = process.env.REMOTE_DB ? `mongodb://${process.env.REMOTE_DB}/${productionDbName}` : process.env.MONGODB_PORT ? `${process.env.MONGODB_PORT.replace("tcp", "mongodb")}/${productionDbName}` : `mongodb://localhost/${productionDbName}`

//manual backups: https://cloud.mongodb.com/v2/5a737c2a4e65812b62606818#clusters/commandLineTools/test-cluster-1

// console.log(secrets);
// console.log(process.env);
// set different database connections for the different environments. in each, the environment variable should override if set
// let devDb = `mongodb://localhost/${dbName}`;

// console.log("ENV SECRETS", envSecrets)
// TODO:  document the remoteDb environment variable below
// option to set database location manually via environment variables
// let remoteDb = process.env.REMOTE_DB ? process.env.REMOTE_DB : false;
// let remoteDb = 'mongodb://fugitivelabs:chunkybutterwalrus@test-cluster-1-shard-00-00-rzbt6.gcp.mongodb.net:27017,test-cluster-1-shard-00-01-rzbt6.gcp.mongodb.net:27017,test-cluster-1-shard-00-02-rzbt6.gcp.mongodb.net:27017/yote?ssl=true&replicaSet=test-cluster-1-shard-0&authSource=admin'

module.exports = {
  development: {
    appUrl: devUrl
    , db: devDbUri
    , dbName: devDbName
    , httpsOptional: true
    , port: process.env.PORT || 3030
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false

  }
  , staging: {
    appUrl: stagingUrl
    , db: stagingDbUri
    , dbName: stagingDbName
    , httpsOptional: true
    , port: process.env.PORT || 3030
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false

  }
  , production: {
    appUrl: prodUrl
    , db: productionDbUri
    , dbName: productionDbName
    , httpsOptional: true
    , port: process.env.PORT || 80
    , rootPath: rootPath
    , secrets: secrets || {}
    , useHttps: false
  }
}
