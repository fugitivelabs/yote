/**
 * ••••••••••••••••••••••••••••••••••••••••••••••••••
 *
 * Welcome to Yote!
 *
 * For documentation visit fugitivelabs.github.io/yote/
 *
 * We hope you like it!
 *   - Fugitive Labs
 *
 * ••••••••••••••••••••••••••••••••••••••••••••••••••
 *
 * Copyright (c) 2015-present, Fugitive Labs, LLC.
 * All rights reserved.
 *
 */

// require libraries
let bodyParser      = require('body-parser');
let cookieParser    = require('cookie-parser');
let compress        = require('compression');
// let errorHandler    = require('errorhandler');
let express         = require('express');
let favicon         = require('serve-favicon');
let fs              = require('fs');
let LocalStrategy   = require('passport-local').Strategy;
let mongoose        = require('mongoose');
let passport        = require('passport');
let path            = require('path');
let serveStatic     = require('serve-static');
let session         = require('express-session');
let timeout         = require('connect-timeout');
// let winston         = require('winston');

// init MongoStore sessions
let MongoStore      = require('connect-mongo')(session);


// init express
let app = express();

// configure the envirment
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./config')[env];

// initialize logger
let logger = require('./logger');
// NOTE: generally 'global' is not considered "best practices", but this will allow access to the logger object in the entire app
global.logger = logger;


// logger examples:
logger.debug("DEBUG LOG");
logger.info("INFO LOG");
logger.warn("WARN LOG");
logger.error("ERROR LOG");

// initialize database
require('./db')(config);

// init User model
let User = mongoose.model('User');

// use express compression plugin
app.use(compress());

// configure express
app.set('views', __dirname);
app.set('view engine', 'pug');
// app.set('view engine', 'html');
app.use(timeout(30000)); //upper bound on server connections, in ms.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection})
  , secret: config.secrets.sessionSecret
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(favicon(path.join(__dirname, 'static','favicon.ico')));

// // Uncomment below to allow file uploads
// app.use(multipart({}));


// serve static assets, incl. react bundle.js
app.use(serveStatic(__dirname + '/static'));

// request checks
app.use((req, res, next) => {

  // Allow CORS & mobile access to the node APIs -- ref https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");

  // test user:
  logger.info("YOTE USER: " + (req.user ? req.user.username : "none"));

  // check mongo connection
  if(mongoose.connection.readyState !== 1) {
    mongoose.connect(config.db);
    res.send("mongoose error, hold your horses...");
  }

  // check for OPTIONS method
  if(req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// initialize passport
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    var projection = {
      username: 1, password_salt: 1, password_hash: 1, roles: 1
    }
    User.findOne({username:username}, projection).exec((err, user) => {
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

passport.serializeUser((user, done) => {
  // logger.warn("SERIALIZE USER");
  if(user) {
    done(null, user._id);
  }
});

passport.deserializeUser((id, done) => {
  // logger.warn("DESERIALIZE USER");
  // NOTE: we want mobile user to have access to their api token, but we don't want it to be select: true
  User.findOne({_id:id}).exec((err, user) => {
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
  // log express http requests in production.
  // app.use(require('morgan')({"stream":logger.stream}));
}

// configure server routes
let router = express.Router();
require('./global/routing/router')(router, app);
app.use('/', router);
// some notes on router: http://scotch.io/tutorials/javascript/learn-to-use-the-new-router-in-expressjs-4

// check for the server timeout. NOTE: this must be last in the middleware stack
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  //http://stackoverflow.com/questions/21708208/express-js-response-timeout
  if (!req.timedout) next();
}

/*
 * Using HTTPS
 * Yote comes out of the box with https support! Check the docs for instructions on how to use.
 */

if(app.get('env') == 'production' && config.useHttps) {
  logger.info("starting production server WITH ssl");

  require('https').createServer({
      key: fs.readFileSync('../server/ssl/yourSsl.key') // so it works on server and local
      , cert: fs.readFileSync('../server/ssl/yourCertFile.crt')
      , ca: [fs.readFileSync('../server/ssl/yourCaFile.crt')] // NOTE: GoDaddy splits certs into two

  // }, app).listen(9191); // NOTE: uncomment to test HTTPS locally
  }, app).listen(443);

  // need to catch for all http requests and redirect to httpS
  if(config.httpsOptional) {
    require('http').createServer(app).listen(80);
  } else {
    require('http').createServer((req, res) => {
      logger.info("REDIRECTING TO HTTPS");
      res.writeHead(302, {
        'Location': 'https://YOUR-URL.com:443' + req.url
        // 'Location': 'https://localhost:9191' + req.url // NOTE: uncomment to test HTTPS locally
      });
      res.end();
    // }).listen(3030); // NOTE: uncomment to test HTTPS locally
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
