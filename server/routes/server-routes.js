var mongoose = require('mongoose');
var passport = require('passport');
var api = require('./route-config');



//define routes
module.exports = function(app) {



  //render jade views as html
  app.get('/views/*', function(req, res) {
    res.render('../../public/app/views/' + req.params);
  });

  //render layout
  app.get('*', function(req, res) {
    res.render('layout', {
      currentUser: req.user
    });
  });

}