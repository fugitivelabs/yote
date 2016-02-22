import React from 'react';
import { Route, IndexRoute } from 'react-router';

//components
import Layout from './components/UserLayout.js.jsx';
import Login from './components/UserLogin.js.jsx';

//routes
const userRoutes =
<Route path="/user" component={Layout} >
  <Route path="/user/login" component={Login} />
</Route>

export default userRoutes;
