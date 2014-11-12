var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/yote" : 'mongodb://localhost/yote'
    , redis: {
      host: process.env.REDIS_PORT ? process.env.REDIS_PORT.replace("tcp://", "").split(":")[0] : "localhost"
      , port: process.env.REDIS_PORT ? process.env.REDIS_PORT.replace("tcp://", "").split(":")[1] : "6379"
    }
    , rootPath: rootPath
    , port: process.env.PORT || 3030
  }
  , production: {
    db: process.env.MONGODB_PORT ? process.env.MONGODB_PORT.replace("tcp", "mongodb") + "/yote" : 'mongodb://localhost/yote'
    , redis: {
      host: process.env.REDIS_PORT ? process.env.REDIS_PORT.replace("tcp://", "").split(":")[0] : "localhost"
      , port: process.env.REDIS_PORT ? process.env.REDIS_PORT.replace("tcp://", "").split(":")[1] : "6379"
    }
    , rootPath: rootPath
    , port: process.env.PORT || 80
  }
}