var mongoose = require('mongoose');
var passport = require('passport');

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
    console.log("LAYOUT");
    console.log(req.user);
    res.render('layout', {
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
    });
  });

}
