/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, useLocation } from 'react-router-dom';

// import hooks
import { useLoggedInUser } from '../../../resources/user/authService';

const YTRoute = ({
  breadcrumbs
  , role
  , login
  , exact
  , path
  , component
}) => {

  // use the hook to get the loggedInUser from the authStore
  const loggedInUser = useLoggedInUser();
  const location = useLocation();
  let newLocation = location;
  if(!newLocation.state) {
    newLocation.state = {}
  }
  newLocation.state.breadcrumbs = breadcrumbs;

  if(role || login) {
    if(!loggedInUser) return <Redirect to={{ pathname: "/user/login", state: { from: location } }} />
    if(role && !loggedInUser.roles?.indexOf[role] > -1) return <Redirect to={{ pathname: "/unauthorized" }} />
    return (
      <Route
        exact={exact}
        path={path}
        component={component}
        location={newLocation}
      />
    )
  }

  // no route protection required
  return (
    <Route
      exact={exact}
      path={path}
      component={component}
      location={newLocation}
    />
  )
}

YTRoute.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string
      , path: PropTypes.string
    })
  )
  , exact: PropTypes.bool
  , login: PropTypes.bool
  , path: PropTypes.string
  , role: PropTypes.string
}

YTRoute.defaultProps = {
  breadcrumbs: []
  , login: false
  , role: null
}

export default YTRoute;
