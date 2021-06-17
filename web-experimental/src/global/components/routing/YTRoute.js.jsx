/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

import Auth from '../../utils/auth';

const YTRoute = ({
  role,
  login,
  exact,
  path,
  component,
}) => {

  // const location = useLocation();
  // let newLocation = location;
  // if(!newLocation.state) {
  //   newLocation.state = {}
  // }
  // newLocation.state.breadcrumbs = breadcrumbs;

  if((role || login) && Auth.notLoggedIn()) {
    // return <Redirect to={{pathname: "/user/login", state: { from: location }}}/>
    return <Redirect to={{pathname: "/user/login" }}/>
  } else if(role && Auth.notRole(role)) {
    return <Redirect to={{pathname: "/unauthorized"}}/>
  } else {
    return (
      <Route
        exact={exact}
        path={path}
        component={component}
      />
    )
  }
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
