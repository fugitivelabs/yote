/**
 * Sets up the routing for all admin views relating to the User resource.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import YTRoute from '../../../global/components/routing/YTRoute.js.jsx';

// import user admin views
import AdminCreateUser from './views/AdminCreateUser.js.jsx';
import AdminUpdateUser from './views/AdminUpdateUser.js.jsx';
import AdminUserList from './views/AdminUserList.js.jsx';

class UserAdminRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute role="admin" exact path="/admin/users" component={AdminUserList}/>
        <YTRoute role="admin" exact path="/admin/users/new" component={AdminCreateUser}/>
        <YTRoute role="admin" exact path="/admin/users/:userId" component={AdminUpdateUser}/>
      </Switch>
    )
  }
}

export default UserAdminRouter;
