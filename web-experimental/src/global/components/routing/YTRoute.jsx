/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import WaitOn from '../helpers/WaitOn';

import { Redirect, Route, useLocation } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';

// import hooks
import { useGetLoggedInUser } from '../../../resources/user/authService';

const YTRoute = ({
  breadcrumbs
  , role
  , login
  , exact
  , path
  , component
}) => {

  // use the hook to get the loggedInUser from the authStore
  const { loggedInUser, ...authQuery } = useGetLoggedInUser();


  const location = useLocation();
  let newLocation = location;
  if(!newLocation.state) {
    newLocation.state = {}
  }
  newLocation.state.breadcrumbs = breadcrumbs;

  return (
    <WaitOn query={authQuery} fallback={<DefaultLayout.Skeleton/>}>
      { (role || login) && !loggedInUser ?
        <Redirect to={{ pathname: "/user/login", state: { from: location } }} />
        :
        role && loggedInUser?.roles?.indexOf[role] === -1 ?
        <Redirect to={{ pathname: "/unauthorized" }} />
        :
        <Route
          exact={exact}
          path={path}
          component={component}
          location={newLocation}
        />
      }
    </WaitOn>
  )
}

YTRoute.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string
      , path: PropTypes.string
    })
  )
  , login: PropTypes.bool
  , role: PropTypes.string
}

YTRoute.defaultProps = {
  breadcrumbs: []
  , login: false
  , role: null
}

export default YTRoute;
