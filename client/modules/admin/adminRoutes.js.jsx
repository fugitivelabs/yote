/**
 * Parent route file for all '/admin' routes
 */

// import primary libraries
import React from 'react';
import { Route } from 'react-router-dom';

// import utilities
import Auth from '../../global/utils/auth';

// import components
import Layout from './components/AdminLayout.js.jsx';
import StyleGuide from './components/StyleGuide.js.jsx';

// import individual module admin routes
import adminUserRoutes from '../user/userAdminRoutes.js.jsx';

// define routes
const adminRoutes =
<Route key={Math.floor(Math.random()*1000)} path="/admin" component={Layout} onEnter={Auth.requireAdmin}>
  <Route path="style-guide" component={StyleGuide} />
  {adminUserRoutes}
</Route>

;


export default adminRoutes;
