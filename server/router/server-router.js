var mongoose = require('mongoose');
var passport = require('passport');
var initialState = require('../initialState');
//define routes


// // TRY TO IMPORT REACT AND REDUX ISH
// // looks like we may need to upgrade something to make ES6 work???
// var React = require('react');
// var renderToString = require('react-dom/server').renderToString;
// var Provider = require('react-redux').Provider;
// var configureStore = require('../../client/configureStore');
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
// const initialStateObj = initialState;
console.log(initialState);
// const store = configureStore(initialState)
//

  // const html = renderToString(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // )

module.exports = function(router, app) {

  //require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', function(req, res) {
    res.send(404);
  });



  //render jade views as html
  router.get('/html/*', function(req, res) {
    res.render('../../public/app/' + req.param("0")); //why?
  });



  //render layout
  router.get('*', function(req, res) {
    res.render('layout', {
      currentUser: req.user
      , initialState: initialState.initialState
      , development: app.get('env') == 'development' ? true : false
    });
  });

}
