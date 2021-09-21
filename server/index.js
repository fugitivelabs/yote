// https://github.com/lorenwest/node-config
const config = require('config')
// todo: after more research, i think dotenv better
// require("dotenv").config();

// open libraries
const express = require('express')
require('express-async-errors');
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// yote libraries
const errorHandler = require('./global/handlers/errorHandler.js')
const { passport } = require('./global/handlers/passportHandler.js');

// in dev the build path points to web/dist, on prod it points to web/build
const buildPath = config.get('buildPath');

// init app
const app = express()

// setup express
app.use(express.static(path.join(__dirname, buildPath)));
app.set('views', path.join(__dirname, buildPath));
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

// other config - cors, options

// connect to database
mongoose.connect(config.get('database.uri') + config.get('database.name'), {
    // mongoose has a lot of depreciation warnings
    useNewUrlParser: true
    , useUnifiedTopology: true
  }).catch(err => console.log("OUCHIE OOOO MY DB", err))

app.use(
  session({
    // secret: process.env.SECRET,
    secret: "ABC123",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.get('database.uri') + config.get('database.name')
      // NOTES HERE - this functions but is NOT correct - connect-mongo changed their package
      // , and we SHOULD be able to pass in teh connection promise, as below, but it breaks. the temp solution creates unnecessary additional database connections
      // https://stackoverflow.com/questions/66388523/error-cannot-init-client-mongo-connect-express-session
      // https://www.npmjs.com/package/connect-mongo#express-or-connect-integration
      
      // correct way, re-use existing connection:
      // clientPromise: mongoose.connection
    })
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// api
let router = express.Router();
require('./global/api/router')(router, app)

app.use('/', router);

// serve the react app index.html
app.get('*', (req, res) => {
  const indexHtmlPath = path.resolve(`${buildPath}/index.html`);
  fs.readFile(indexHtmlPath, 'utf8', (err, indexHtml) => {
    if(err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    // inject current user into the html by replacing the __CURRENT_USER__ placeholder in the html file. Info: https://create-react-app.dev/docs/title-and-meta-tags#injecting-data-from-the-server-into-the-page
    // use `serialize` library to eliminate risk of XSS attacks when embedding JSON in html. Info: https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
    const indexHtmlWithData = indexHtml.replace('__CURRENT_USER__', req.user ? serialize(req.user, { isJSON: true }) : '');
    return res.send(indexHtmlWithData);
  });
});

// unified error handler
app.use(errorHandler)

app.listen(3030, () => {
  console.log(`Example app listening at ${config.get('app.url')}`)
})