var mongoose = require('mongoose');

//models
var User = require('../models/User')
;
//DECLARE MODELS HERE

//open database connection
module.exports = function(config) {
  mongoose.connect(config.mongoUri);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'database connection error...'));
  db.once('open', function callback() {
    console.log('coyote database opened');
  });
}