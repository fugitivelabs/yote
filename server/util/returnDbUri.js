const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const envSecrets = require('../secrets.js')[env];

console.log("RETURNING DB URI FOR ENV=" + env);
console.log(config.db);