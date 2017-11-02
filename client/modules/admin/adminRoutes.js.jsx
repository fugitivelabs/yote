/**
 * Parent route file for all '/admin' routes
 */

// import primary libraries
import React from 'react';
import Base from "../../global/components/BaseComponent.js.jsx";
import { Redirect, Route } from 'react-router-dom';

// import utilities
import Auth from '../../global/utils/auth';

// import components
import AdminLayout from './components/AdminLayout.js.jsx';
import StyleGuide from './components/StyleGuide.js.jsx';

// import individual module admin routes
import adminUserRoutes from '../user/userAdminRoutes.js.jsx';

// define routes
const adminRoutes =
<Route
  key={Math.floor(Math.random()*1000)}
  path="/admin"
  render={() => (
    Auth.notLoggedIn() ?
      <Redirect to={{
          pathname: "/user/login"
          , state: { from: '/admin' }
        }}
      />
    : Auth.notAdmin() ?
      <Redirect to={{
          pathname: "/unauthorized"
        }}
      />
    :
      <AdminLayout/>
  )}
/>
;


export default adminRoutes;
