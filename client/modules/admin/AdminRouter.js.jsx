/**
 * Sets up the routing for all Admin views.
 *
 * NOTE: All imported [Module]AdminRouter files must be wrapped in a Route wrapper
 * inside the switch in order to resolve correctly.  See <UserAdminRouter/>
 * below as an example.
 */

// import primary libraries
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import admin views
import AdminDashboard from './views/AdminDashboard.js.jsx';
import StyleGuide from './views/StyleGuide.js.jsx';

// import admin components
import AdminLayout from './components/AdminLayout.js.jsx';

// import other admin routes
import UserAdminRouter from '../user/UserAdminRouter.js.jsx';

class AdminRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminLayout>
        <Switch>
          <YTRoute role="admin" exact path="/admin" component={AdminDashboard}/>
          <YTRoute role="admin" exact path="/admin/style-guide" component={StyleGuide}/>
          <YTRoute role="admin" path="/admin/users">
            <UserAdminRouter/>
          </YTRoute>
        </Switch>
      </AdminLayout>
    )
  }
}

export default AdminRouter;
