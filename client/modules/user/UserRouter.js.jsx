/**
 * Sets up the routing for all non-admin User views.
 */

// import primary libraries
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import { LoginRoute, RoleRoute } from '../../global/components/routing';

// import user views
import ForgotPassword from './views/ForgotPassword.js.jsx';
import ResetPassword from './views/ResetPassword.js.jsx';
import UserLogin from './views/UserLogin.js.jsx';
import UserProfile from './views/UserProfile.js.jsx';
import UserRegister from './views/UserRegister.js.jsx';

class UserRouter extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch >
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/register" component={UserRegister} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:hex" component={ResetPassword} />
        <LoginRoute exact path="/profile" component={UserProfile} />
      </Switch>
    )
  }
}

export default UserRouter;
