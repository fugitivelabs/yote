const secrets = require(`./secrets.js`);
const envSecrets = secrets[process.env.NODE_ENV];

const config = {
  session: {
    secret: envSecrets.sessionSecret
  }

  , externalApis: {
    mandrill: {
      apiKey: envSecrets.mandrill
    }
  }
};

module.exports = config;