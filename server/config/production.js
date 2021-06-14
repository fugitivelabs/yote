const secrets = require(`./secrets.js`);
const envSecrets = secrets[process.env.NODE_ENV];

const config = {
  app: {
    port: 80
    , useHttps: true
  }

  , database: {
    dbName: `yote-prod`
  }

};

module.exports = config;