/**
 * All _admin_ routes directly associated with the User module
 */

// import primary libararies
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import authentication utility to protect certain routes 
import Auth from '../../global/utils/auth';

// import admin components
import AdminCreateUser from './components/AdminCreateUser.js.jsx';
import AdminUpdateUser from './components/AdminUpdateUser.js.jsx';
import AdminUserList from './components/AdminUserList.js.jsx';


// define admin routes
const adminUserRoutes =
<Route path="/admin/users" onEnter={Auth.requireAdmin} >
  <IndexRoute component={AdminUserList} />
  <Route path="new" component={AdminCreateUser} onEnter={Auth.requireAdmin}/>
  <Route path=":userId">
    <IndexRoute component={AdminUpdateUser} />
  </Route>
</Route>
;


export default adminUserRoutes;
