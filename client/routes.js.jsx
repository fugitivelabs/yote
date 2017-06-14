/**
 * This files dynamically compiles the module routes for the client and
 * redirects any route that doesn't match to a 'NotFound'/404 page
 */

// import primary libraries
import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';

// import custom components
import Landing from './modules/static/components/landing/Landing.js.jsx';
import NotFound from './modules/static/components/NotFound.js.jsx';
import Root from './global/components/Root.js.jsx';

const routes =
      <Route path="/" component={Root} >
        <Route path="/land" component={Landing} />
        {/*{ Object.keys(moduleRoutes).map((moduleName, i) =>
          moduleRoutes[moduleName]
        )}*/}
        <Route path="/*" component={NotFound} />
      </Route>
;

export default routes;

import * as moduleRoutes from './modules/moduleRoutes.js';
