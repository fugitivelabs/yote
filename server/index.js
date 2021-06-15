// https://github.com/lorenwest/node-config
const config = require('config')
// todo: after more research, i think dotenv better

// open libraries
const express = require('express')
require('express-async-errors');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// yote libraries
const errorHandler = require('./global/handlers/errorHandler.js')

// init app
const app = express()

// setup express
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'global/views'));
app.set('view engine', 'pug');
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
})

// passport

// const Product = require('./resources/product/ProductModel');
// const productApi = require('./resources/product/productApi')(router)

// api
let router = express.Router();
require('./global/api/router')(router, app)

app.use('/', router);

// unified error handler
app.use(errorHandler)

let server;

app.listen(3030, () => {
  console.log(`Example app listening at ${config.get('app.url')}`)
})