/**
 * Configure the application routes
 */


const htmlIndex = require('pug').compileFile('global/layouts/htmlIndex.pug')

module.exports = (router, app) => {

  // require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', (req, res) => {
    res.send(404);
  });

  // render layout
  router.get('*', (req, res) => {

    // pre-compile html layout and send
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(htmlIndex({
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
    }));

    // res.render('layout', {
    //   currentUser: req.user
    //   , development: app.get('env') == 'development' ? true : false
    // });
  });

}
