/*  
••••••••••••••••••••••••••••••••••••••••••••••••••

Welcome to Yote.  We hope you like it. 

  - Fugitive Labs

••••••••••••••••••••••••••••••••••••••••••••••••••
*/


var express         = require('express')
  , bodyParser      = require('body-parser')
  , cookieParser    = require('cookie-parser')
  , serveStatic     = require('serve-static')
  , logger          = require('morgan')
  , session         = require('express-session')
  , favicon         = require('serve-favicon')
  , errorHandler    = require('errorhandler')
  , mongoose        = require('mongoose')
  , passport        = require('passport')
  , LocalStrategy   = require('passport-local').Strategy
  , sass            = require('node-sass-middleware')
  , path            = require('path')
  , RedisStore      = require('connect-redis')(session)
  ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config')[env];

//initialize database
require('./server/db')(config);

//init User model
var UserSchema = require('./server/models/User').User
  , User = mongoose.model('User')

//configure express
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//redis for persistent session storage
app.use(session({
  store: new RedisStore({
    host: config.redis.host
    , port: config.redis.port
  })
  , secret: 'fugitive all up in your labs'
}));
app.use(favicon(path.join(__dirname, 'public','favicon.ico'))); 
app.use(passport.initialize());
app.use(passport.session());

//sass middleware
app.use(sass({
  src: __dirname + '/public'
  , dest: __dirname + '/public/css'
  , prefix: '/css'
  , debug: true
  , outputStyle: 'compressed'
  , includePaths: ['public/app/', 'public/sass/globals/', 'globals/sass/includes/']
}));

//allow the angular ui-views to be written in Jade
app.use(serveStatic(__dirname + '/public'));

//request checks
app.use(function(req, res, next) {
  //test user:
  console.log("YOTE USER: " + (req.user ? req.user.username : "none"));
  //no mongo connection
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
        console.log("authenticated!");
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

// development only
if (app.get('env') == 'development') {
  console.log("DEVELOPMENT");
  // app.use(errorHandler());
} else if(app.get('env') == 'production') {
  console.log("PRODUCTION");
}

//configure server routes
var router = express.Router();
// require('./server/routes/api-routes')(router);
require('./server/router/server-router')(router, app);
//some notes on router: http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4
app.use('/', router);
app.listen(config.port);
console.log('Yote is listening on port ' + config.port + '...');


