/**
 * Sets up the routing for all Product views.
 */

// import primary libraries
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import { LoginRoute, RoleRoute } from '../../global/components/routing';

// import admin views
import AdminDashboard from './views/AdminDashboard.js.jsx';
import StyleGuide from './views/StyleGuide.js.jsx';

// import admin components 
import AdminLayout from './components/AdminLayout.js.jsx';

// import other admin routes
import UserAdminRouter from '../user/UserAdminRouter.js.jsx';

class ProductRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminLayout>
        <Switch >
          <RoleRoute exact path="/admin" component={AdminDashboard} role="admin" />
          <RoleRoute exact path="/admin/style-guide" component={StyleGuide} role="admin" />
          <UserAdminRouter/>
        </Switch>
      </AdminLayout>
    )
  }
}

export default ProductRouter;
