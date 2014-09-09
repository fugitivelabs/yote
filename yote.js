var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , sass = require('node-sass')
  ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config')[env];

//initialize database
require('./server/db')(config);

//init User model
var User = require('./server/models/User').User;

//configure express
app.configure(function() {
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: 'fugitive labs is neat-o daddy-o'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(sass.middleware({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/css',
    prefix: '/css',
    debug: true,
    outputStyle: 'compressed'
  }));
  //allow the angular ui-views to be written in Jade
  app.use(express.static(__dirname + '/public'));
});

//handle mongo errors
app.use(function(req, res, next) {
  //no connection
  if(mongoose.connection.readyState !== 1) {
    mongoose.connect(config.db);
    res.send("mongoose error, hold your horses...");
  }
  next();
});

//initialize passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username:username}).exec(function(err, user) {
      if(user && user.authenticate(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  if(user) {
    done(null, user._id);
  }
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id:id}).exec(function(err, user) {
    if(user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
})

//configure server routes
require('./server/routes')(app);

app.listen(config.port);
console.log('Yote is listening on port ' + config.port + '...');
