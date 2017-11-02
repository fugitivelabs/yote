import React from 'react';
import { Route } from 'react-router-dom';

//components
import UserProfileLayout from './components/UserProfileLayout.js.jsx';
import UserProfile from './components/UserProfile.js.jsx';

//routes
const userProfileRoutes =
<Route
  component={UserProfileLayout}
  key={Math.floor(Math.random()*1000)}
  path="/profile"
/>

export default userProfileRoutes;
