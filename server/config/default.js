const secrets = require(`./secrets.js`);
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

  , database: {
    dbName: `yote`
    , dbUri: `mongodb://localhost/`
  }

  , session: {
    secret: envSecrets.sessionSecret
  }

  , externalApis: {
    mandrill: {
      apiKey: envSecrets.mandrill
    }
  }
};

module.exports = config;