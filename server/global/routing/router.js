/**
 * Configure the application routes
 */
import React from "react";
import { renderToString } from "react-dom/server";

// generate re-useable layout function (faster)
let layout = require('pug').compileFile('layout.pug')


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
    res.end(generateHtmlTemplate(
      null
      , req.user
      , app.get('env') == 'development' ? true : false
    ));

    // res.render('layout', {
    //   currentUser: req.user
    //   , development: app.get('env') == 'development' ? true : false
    // });
  });

  function generateHtmlTemplate(reactDom, user, env) {
    return layout({
      currentUser: user
      , development: env
    })
  }

}
