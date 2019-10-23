/**
 * Configure the application routes
 */
import React from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux';

// import front end components
//TODO: need some sort of check for if they exist
// import routes from '../../../web/config/routes.js';
// import ReactLayout from '../../../web/ReactLayout'
import ReactLayout from '../../ReactLayout'
import { Provider } from 'react-redux';
import routes from '../../../web/config/routes.js.jsx';
import configureStore from '../../../web/config/configureStore';

// generate re-useable layout function (faster)
const htmlLayout = require('pug').compileFile('htmlLayout.pug')


module.exports = (router, app) => {

  // require api routes list
  require('./api-router')(router);

  // catch all other api requests and send 404
  router.all('/api/*', (req, res) => {
    res.send(404);
  });


  // render layout
  router.get('*', (req, res) => {

    const store = configureStore();
    const context = {}


    console.log("STORE? ", store.getState())
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
    const reactDom = renderToString(jsxLayout)

    console.log("REACT DOM", reactDom)

    // TODO: hydrate
    // const app = document.getElementById("application-main-yote")
    // ReactDOM.hydrate(rea)

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(htmlLayout({
      currentUser: req.user
      , development: app.get('env') == 'development' ? true : false
      , reactDom
    }));
  });

  // router.get('*', (req, res) => {

  //   res.render('htmlLayout', {
  //     currentUser: req.user
  //     , development: app.get('env') == 'development' ? true : false
  //   });
  // });

}
