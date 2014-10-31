var mongoose = require('mongoose');
var passport = require('passport');
var api = require('./route-config');



//define routes
module.exports = function(router) {



  //render jade views as html
  router.get('/views/*', function(req, res) {
    // console.log(req.param("0"));
    res.render('../../public/app/views/' + req.param("0")); //why?
  });

  //render layout
  router.get('*', function(req, res) {
    res.render('layout', {
      currentUser: req.user
    });
  });

}