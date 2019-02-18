/**
 * Configure the application routes
 */

module.exports = (router, app) => {

  // require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', (req, res) => {
    res.send(404);
  });

  // render layout
  router.get('*', (req, res) => {
    res.render('layout', {
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
    });
  });

}
