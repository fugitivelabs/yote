import React from 'react';
import { Route, IndexRoute } from 'react-router';

//components
import AdminUserList from './components/AdminUserList.js.jsx';
import AdminCreateUser from './components/AdminCreateUser.js.jsx';
import AdminUpdateUser from './components/AdminUpdateUser.js.jsx';


//routes
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
