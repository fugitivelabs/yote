var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath
    , port: process.env.PORT || 3111
    , mongoUri: 'mongodb://localhost/coyote'
  }
  , production: {
    rootPath: rootPath
    , port: process.env.PORT || 80
    , mongoUri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
  }
}
