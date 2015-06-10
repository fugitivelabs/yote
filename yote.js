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
  , winston         = require('winston')
  , session         = require('express-session')
  , favicon         = require('serve-favicon')
  , timeout         = require('connect-timeout')
  , errorHandler    = require('errorhandler')
  , mongoose        = require('mongoose')
  , passport        = require('passport')
  , LocalStrategy   = require('passport-local').Strategy
  , sass            = require('node-sass-middleware')
  , path            = require('path')
  , RedisStore      = require('connect-redis')(session)
  , multipart       = require('connect-multiparty')
  , fs              = require('fs')
  ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config')[env];

//initialize logger
// generally global is not considered "best practices", but this will allow access to the logger object in the entire app
global.logger = require('./logger');
// LOG EXAMPLES:
logger.debug("DEBUG LOG");
logger.info("INFO LOG");
logger.warn("WARN LOG");
logger.error("ERROR LOG");

//initialize database
require('./server/db')(config);

//init User model
var UserSchema = require('./server/models/User').User
  , User = mongoose.model('User')

//configure express
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(timeout(30000)); //upper bound on server connections, in ms.
// app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//redis for persistent session storage
app.use(session({
  store: new RedisStore({
    host: config.redis.host
    , port: config.redis.port
  })
  , secret: config.secrets.sessionSecret
  // //enable for secure cookies when using https
  // , cookie: {
  //   secure: ((app.get('env') == 'production') ? true : false)
  // }
}));
app.use(favicon(path.join(__dirname, 'public','favicon.ico'))); 
app.use(passport.initialize());
app.use(passport.session());

//allow file uploads
app.use(multipart({}));

//sass middleware
//only enable for development env - npm module can be buggy
if (app.get('env') == 'development') {
  app.use(sass({
    src: __dirname + '/public'
    , dest: __dirname + '/public/css'
    , prefix: '/css'
    , debug: true
    , outputStyle: 'compressed'
    , includePaths: ['public/app/', 'public/sass/globals/', 'globals/sass/includes/']
  }));
}

//allow the angular ui-views to be written in Jade
app.use(serveStatic(__dirname + '/public'));

//request checks
app.use(function(req, res, next) {

  //to allow CORS access to the node APIs, follow these steps:
  // 1. know what you are doing.
  // 2. uncommente the following 3 lines.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  // ref https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

  //test user:
  logger.info("YOTE USER: " + (req.user ? req.user.username : "none"));
  //no mongo connection
  if(mongoose.connection.readyState !== 1) {
    mongoose.connect(config.db);
    res.send("mongoose error, hold your horses...");
  }
  //check for OPTIONS method
  if(req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

//initialize passport
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    var projection = {
      firstName: 1, lastName: 1, username: 1, password_salt: 1, password_hash: 1, roles: 1
    }
    User.findOne({username:username}, projection).exec(function(err, user) {
      if(user && user.authenticate(password)) {
        logger.debug("authenticated!");
        return done(null, user);
      } else {
        logger.debug("NOT authenticated");
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
  //does not need projection
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
  logger.debug("DEVELOPMENT");
  // app.use(errorHandler());
} else if(app.get('env') == 'production') {
  logger.debug("PRODUCTION");
  //log express http requests in production. way to much in dev.
  app.use(require('morgan')({"stream":logger.stream}));
}

//configure server routes
var router = express.Router();
// require('./server/routes/api-routes')(router);
require('./server/router/server-router')(router, app);
//some notes on router: http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4
app.use('/', router);

//check for the server timeout. must be last in the middleware stack
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  //http://stackoverflow.com/questions/21708208/express-js-response-timeout
  if (!req.timedout) next();
}

//SSL
//Yote comes out of the box with https support! Check the readme for instructions on how to use.
var useHttps = false;
var httpsOptional = false;

if(app.get('env') == 'production' && useHttps) {
  logger.info("starting production server WITH ssl");

  require('https').createServer({
      key: fs.readFileSync('../projectName/ssl/yourSsl.key') //so it works on server and local
      , cert: fs.readFileSync('../projectName/ssl/yourCertFile.crt')
      , ca: [fs.readFileSync('../projectName/ssl/yourCaFile.crt')] // godaddy splits certs into two
      //disallow ciphers that have security flaws
      , honorCipherOrder: true
      , ciphers: 'ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:AES128-GCM-SHA256:!RC4:HIGH:!MD5:!aNULL'
      //https://nodejs.org/docs/latest/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
      //https://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT
      //https://sites.google.com/site/jimmyxu101/testing/openssl
  // }, app).listen(9191);
  }, app).listen(443);

  //need to catch for all http requests and redirect to httpS
  var http = require('http');
  if(httpsOptional) {
    require('http').createServer(app).listen(80);
  } else {
    require('http').createServer(function(req, res) {
      logger.info("REDIRECTING TO HTTPS");
      res.writeHead(302, {
        'Location': 'https://YOUR-URL.com:443' + req.url
        // 'Location': 'https://localhost:9191' + req.url
      });
      res.end();
    // }).listen(3030);
    }).listen(80);
  }

  logger.info('Yote is listening on port ' + 80 + ' and ' + 443 + '...');

} else if(app.get('env') == 'production') {
  logger.info("starting yote production server WITHOUT ssl");
  require('http').createServer(app).listen(config.port);
  logger.info('Yote is listening on port ' + config.port + '...');
} else {
  logger.info("starting yote dev server");
  require('http').createServer(app).listen(config.port);
  logger.info('Yote is listening on port ' + config.port + '...');
}


