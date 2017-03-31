/**
 * All routes directly associated with the User module that _aren't_ admin routes
 */

// import primary libraries
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import components
import ForgotPassword from './components/ForgotPassword.js.jsx';
import ResetPassword from './components/ResetPassword.js.jsx';
import UserLayout from './components/UserLayout.js.jsx';
import UserLogin from './components/UserLogin.js.jsx';
import UserRegister from './components/UserRegister.js.jsx';

// define routes
const userRoutes =
<Route key={Math.floor(Math.random()*1000)} path="user" component={UserLayout} >
  <Route path="login" component={UserLogin} onEnter={checkLogin} />
  <Route path="register" component={UserRegister} onEnter={checkLogin} />
  <Route path="forgotpassword" component={ForgotPassword} />
  <Route path="resetpassword/:hex" component={ResetPassword} />
</Route>

export default userRoutes;


function checkLogin(nextState, replace) {
  /**
   * Checks currentUser cookie to see that if a user is already logged in.
   * If so, reroute to index page.
   *
   * NOTE: This is good for email invitations and such that have links that
   * point to a login page
   */
  if (window.currentUser._id) {
    // user already logged in. Redirect to index.
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
