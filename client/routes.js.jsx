/**
 * This files dynamically compiles the module routes for the client and
 * redirects any route that doesn't match to a 'NotFound'/404 page
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import custom components
import Forbidden from './modules/static/components/Forbidden.js.jsx';
import Landing from './modules/static/components/landing/Landing.js.jsx';
import NotFound from './modules/static/components/NotFound.js.jsx';

import * as moduleRoutes from './modules/moduleRoutes.js';

import ProductRouter from './modules/product/ProductRouter.js.jsx';
import UserRouter from './modules/user/UserRouter.js.jsx';

const routes =
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/unauthorized" component={Forbidden} />
    { Object.keys(moduleRoutes).map((moduleName, i) =>
      moduleRoutes[moduleName]
    )}
    <Route component={NotFound} />
  </Switch>
;

export default routes;

//
// { Object.keys(moduleRoutes).map((moduleName, i) =>
//   <Route
//     component={moduleRoutes[moduleName]}
//     key={Math.floor(Math.random()*100000)}
//   />
// )}
// <Route path="/products" component={ProductRouter}/>
// <Route path="/user" component={UserRouter}/>
