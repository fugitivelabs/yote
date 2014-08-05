var express = require('express')
  , passport = require('passport')
  , localStrategy = require('passport-local').Strategy
  , passportLocalMongoose = require('passport-local-mongoose')
  ;

//set environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//init express
var app = express();

//configuration
var config = require('./server/config/config')[env]
  , db = require('./server/config/db')(config)
  ;

//express configuration
app.set('views', config.rootPath + '/server/views');
app.set('view engine', 'jade');
//note: no longer included by default in Connect 3.0
//https://github.com/senchalabs/connect#middleware
var cookieParser    = require('cookie-parser')
  , bodyParser      = require('body-parser')
  , expressSession  = require('express-session')
  , serveStatic     = require('serve-static')
  ;
app.use(cookieParser('coyote is neatness'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(expressSession({secret: 'fugitive labs is neat'}));
app.use(serveStatic(config.rootPath + '/public'));

//passport setup
app.use(passport.initialize());
app.use(passport.session());
//TODO: social logins, too
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

require('./server/config/routes')(app);


app.listen(config.port);
console.log('Coyote is listening at ' + config.port + '...');