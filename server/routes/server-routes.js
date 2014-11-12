var mongoose = require('mongoose');
var passport = require('passport');
var api = require('./route-config');



//define routes
module.exports = function(router, app) {

  //render jade views as html
  router.get('/html/*', function(req, res) {
    // console.log(req.param("0"));
    res.render('../../public/app/' + req.param("0")); //why?
  });

  //render layout
  router.get('*', function(req, res) {
    // console.log(app.get('env'));
    res.render('layout', {
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
    });
  });

}