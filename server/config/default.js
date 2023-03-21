const secrets = require(`./secrets.js`);
// console.log("SECRETS", secrets, process.env.NODE_ENV)
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envSecrets = secrets[process.env.NODE_ENV];

const config = {
  log: {
    level: 'DEBUG'
  }

  , app: {
    port: 3030
    , url: `localhost:3030`
    , useHttps: false
  }
  , buildPath: '../web/dist'

  , database: {
    uri: `mongodb://localhost/`
    , name: `yote`
  }

  , session: {
    // set by env
  }

  , externalApis: {
    // set by env
  }
};

module.exports = config;