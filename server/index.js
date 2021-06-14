// https://github.com/lorenwest/node-config
const config = require('config')
const express = require('express')
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// init app
const app = express()

// setup express
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'global/views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())

// connect to database
mongoose.connect(config.get('database.uri') + config.get('database.name'), {
  // mongoose has a lot of depreciation warnings
  useNewUrlParser: true
  , useUnifiedTopology: true
})


app.get('/', (req, res) => {
  console.log(config.get('database'))
  res.send('Hello World!')
})

app.listen(3030, () => {
  console.log(`Example app listening at ${config.get('app.url')}`)
})