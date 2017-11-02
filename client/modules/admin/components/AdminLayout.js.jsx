/**
 * Wrap all admin children in this special admin layout
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import admin components
import AdminSideNav from './AdminSideNav.js.jsx';
import AdminDashboard from './AdminDashboard.js.jsx';
import StyleGuide from './StyleGuide.js.jsx';

// import individual module admin routes
import adminUserRoutes from '../../user/userAdminRoutes.js.jsx';


export default class AdminLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout admin">
        <div className="admin-layout">
          <AdminSideNav />
          <div className="admin-main-content">
            <Switch >
              <Route exact path="/admin" component={AdminDashboard}/>
              <Route path="/admin/style-guide" component={StyleGuide} />
              {adminUserRoutes}
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
