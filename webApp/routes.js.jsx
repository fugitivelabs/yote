/**
 * This files dynamically compiles the module routes for the client and
 * redirects any route that doesn't match to a 'NotFound'/404 page
 *
 * Below we import all module routes and assign them top-level pathnames as the
 * kebab-case version of their moduleName. For example in clientRoutes.js.jsx:
 * export { default as userWorkouts } ... would become a top-level Route with the
 * path="/user-workouts" and so on.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import third-party libraries
import _ from 'lodash';

// import custom components
import Forbidden from './client/global/views/static/Forbidden.js.jsx';
import Landing from './client/global/views/static/Landing.js.jsx';
import NotFound from './client/global/views/static/NotFound.js.jsx';

// import client and admin routes from the modules
import * as adminRoutes from './admin/adminRoutes.js';
import * as clientRoutes from './client/clientRoutes.js';

const routes =
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/unauthorized" component={Forbidden} />
    { Object.keys(clientRoutes).map((moduleName, i) =>
      <Route
        component={clientRoutes[moduleName]}
        key={Math.floor(Math.random()*100000)}
        path={`/${_.kebabCase(moduleName)}`}
      />
    )}
    { Object.keys(adminRoutes).map((moduleName, i) =>
      <YTRoute
        component={adminRoutes[moduleName]}
        key={Math.floor(Math.random()*100000)}
        path={`/admin/${_.kebabCase(moduleName)}`}
        role="admin"
      />
    )}
    <Route component={NotFound} />
  </Switch>
;

export default routes;
