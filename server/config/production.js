const secrets = require(`./secrets.js`);
const envSecrets = secrets[process.env.NODE_ENV];

const config = {
  app: {
    port: 80
    , useHttps: true
  }

  , session: {
    secret: envSecrets.sessionSecret
  }

  , database: {
    dbName: `yote-prod`
  }

  , externalApis: {
    mandrill: {
      apiKey: envSecrets.mandrill
    }
  }

};

module.exports = config;