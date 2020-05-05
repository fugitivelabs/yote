/**
 * Configure the application routes
 */

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('../../config')[env];

const htmlIndex = require('pug').compileFile('global/layouts/htmlIndex.pug')

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
// import front end components
//TODO: need some sort of check for if they exist
// import routes from '../../../web/config/routes.js';
// import ReactLayout from '../../../web/ReactLayout'
import ReactIndex from '../layouts/reactIndex.js';
import { Provider } from 'react-redux';
import routes from '../../../web/config/routes.js.jsx';
import configureStore from '../../../web/config/configureStore';

module.exports = (router, app) => {

  // require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', (req, res) => {
    res.send(404);
  });

  // render react layout
  router.get('*', (req, res) => {

    const store = configureStore();
    const context = {}
    const state = store.getState();


    console.log()
    // console.log("STORE STATE? ", state)

    const jsxLayout = (
      <Provider store={store}>
        {/* <h1>Test</h1> */}
        {/* <StaticRouter context={context} location={req.url}>
          {routes}
        </StaticRouter> */}
        <ConnectedRouter context={context} location={req.url}>
          {routes}
        </ConnectedRouter>
      </Provider>
    )


    // const jsx = (<h1>TEST</h1>)
    // const reactDom = renderToString(jsx)
    // console.log(TEST)
    console.log(jsxLayout)
    const reactDom = renderToString(jsxLayout)

    console.log("REACT DOM", reactDom)

    // TODO: hydrate
    // const app = document.getElementById("application-main-yote")
    // ReactDOM.hydrate(rea)

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(htmlIndex({
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
      , appUrl: config.appUrl
      , env
      , reactDom
    }));
  });

  // // render html layout
  // router.get('*', (req, res) => {

  //   // pre-compile html layout and send
  //   res.writeHead( 200, { "Content-Type": "text/html" } );
  //   res.end(htmlIndex({
  //     currentUser: req.user
  //     , development: env == 'development' ? true : false
  //     , appUrl: config.appUrl
  //     , env
  //   }));

  //   // res.render('layout', {
  //   //   currentUser: req.user
  //   //   , development: app.get('env') == 'development' ? true : false
  //   // });
  // });

}
