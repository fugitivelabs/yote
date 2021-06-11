/**
 * This files dynamically compiles the module routes for the client and
 * redirects any route that doesn't match to a 'NotFound'/404 page
 *
 * Below we import all module routes and assign them top-level pathnames as the
 * kebab-case version of their resourceName. For example in resourceRoutes.js.jsx:
 * export { default as userWorkouts } ... would become a top-level Route with the
 * path="/user-workouts" and so on.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import YTRoute from '../global/components/routing/YTRoute.js.jsx';

// import third-party libraries
import _ from 'lodash';

// import custom components
import Forbidden from '../global/components/navigation/Forbidden.js.jsx';
import Landing from '../global/landing/views/Landing.js.jsx';
import NotFound from '../global/components/navigation/NotFound.js.jsx';
import AdminDashboard from '../global/admin/views/AdminDashboard.js.jsx';

// import main client and admin routes from the modules
import * as adminResourceRoutes from './adminResourceRoutes.js';
import * as resourceRoutes from './resourceRoutes.js';

import AdminRouter from '../global/admin/AdminRouter.js.jsx';

const routes =
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/unauthorized" component={Forbidden} />
    { Object.keys(resourceRoutes).map((resourceName, i) =>
      <Route
        component={resourceRoutes[resourceName]}
        key={Math.floor(Math.random()*100000)}
        path={`/${_.kebabCase(resourceName)}`}
      />
    )}
    { Object.keys(adminResourceRoutes).map((resourceName, i) =>
      <YTRoute
        component={adminResourceRoutes[resourceName]}
        key={Math.floor(Math.random()*100000)}
        path={`/admin/${_.kebabCase(resourceName)}`}
        role="admin"
      />
    )}
    <Route path="/admin">
      <AdminRouter/>
    </Route>
    <Route component={NotFound} />
  </Switch>
;

export default routes;
