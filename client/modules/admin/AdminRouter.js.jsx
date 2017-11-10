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

// import other admin routes

class ProductRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        
        <Switch >
          <RoleRoute exact path="/admin" component={AdminDashboard} role="/admin" />
          <RoleRoute exact path="/admin" component={StyleGuide} role="/admin" />
        </Switch>
      </div>
    )
  }
}

export default ProductRouter;
