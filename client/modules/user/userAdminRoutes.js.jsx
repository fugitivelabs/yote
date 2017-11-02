/**
 * All _admin_ routes directly associated with the User module
 */

// import primary libararies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import authentication utility to protect certain routes
import Auth from '../../global/utils/auth';

// import admin components
import AdminCreateUser from './components/AdminCreateUser.js.jsx';
import AdminUpdateUser from './components/AdminUpdateUser.js.jsx';
import AdminUserList from './components/AdminUserList.js.jsx';


// define admin routes
const adminUserRoutes =
<Switch>
  <Route exact path="/admin/users" component={AdminUserList} />
  <Route path="/admin/users/new" component={AdminCreateUser} />
  <Route path="/admin/users/:userId" component={AdminUpdateUser} />
</Switch>
;


export default adminUserRoutes;
