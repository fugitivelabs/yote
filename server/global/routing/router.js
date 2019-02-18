/**
 * Configure the application routes
 */
import React from "react";
import { renderToString } from "react-dom/server";

// generate re-useable layout function (faster)
const layout = require('pug').compileFile('layout.pug')


module.exports = (router, app) => {

  // require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', (req, res) => {
    res.send(404);
  });



  // render layout
  router.get('*', (req, res) => {

    // const reactDom = htmlTemplate()

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(layout({
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
    }));

    // res.render('layout', {
    //   currentUser: req.user
    //   , development: app.get('env') == 'development' ? true : false
    // });
  });

}
