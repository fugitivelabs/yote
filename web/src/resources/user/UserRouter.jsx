/**
 * Sets up the routing for all non-admin User views.
 */

// import primary libraries
import React from 'react';
import { Switch } from 'react-router-dom';

// import global components
import YTRoute from '../../global/components/routing/YTRoute.jsx';

// import user views
// import ForgotPassword from './views/ForgotPassword.jsx';
// import ResetPassword from './views/ResetPassword.jsx';
import UserLogin from './views/UserLogin.jsx';
// import UserProfile from './views/UserProfile.jsx';
import UserRegister from './views/UserRegister.jsx';

const UserRouter = () => {

  return (
    <Switch>
      <YTRoute exact path="/user/login" component={UserLogin} />
      <YTRoute exact path="/user/register" component={UserRegister} />
      {/* <YTRoute exact path="/user/forgot-password" component={ForgotPassword} />
      <YTRoute exact path="/user/reset-password/:hex" component={ResetPassword} />
      <YTRoute login={true} exact path="/user/profile" component={UserProfile} /> */}
    </Switch>
  )
}

export default UserRouter;
