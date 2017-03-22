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
<Route key={Math.floor(Math.random()*1000)} path="/user" component={UserLayout} >
  <Route path="/user/login" component={UserLogin} />
  <Route path="/user/register" component={UserRegister} />
  <Route path="/user/forgotpassword" component={ForgotPassword} />
  <Route path="/user/resetpassword/:hex" component={ResetPassword} />
</Route>

export default userRoutes;
