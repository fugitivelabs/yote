/**
 * All routes directly associated with the User module that _aren't_ admin routes
 */

// import primary libraries
import React from 'react';
import { Route } from 'react-router-dom';

// import components
import UserLayout from './components/UserLayout.js.jsx';

// define routes
const userRoutes =
<Route
  component={UserLayout}
  key={Math.floor(Math.random()*1000)}
  path="/user"
/>

export default userRoutes;
