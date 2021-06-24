/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import the selector function
import { getLoggedInUser } from '../../../resources/user/authStore';

const YTRoute = ({
  breadcrumbs,
  role,
  login,
  exact,
  path,
  component,
}) => {

  /**
   * NOTE: All of the loggedInUser stuff works, but we haven't yet figured out how we're going to persist
   * sessions so you'll be logged out if you refresh your browser.
   * 
   * TODO: Figure out how we're going to handle user authentication on the server and come up with a way
   * to persist sessions.
   * 
   * useSelector is like mapStoreToProps. It accesses the entire store.
   * const loggedInUser = useSelector((store) => {
   *  // access the entire store
   * }
   * 
   * we can use destructuring to access a specific reducer. In this case the 'auth' reducer.
   * const loggedInUser = useSelector(({auth}) => auth.loggedInUser);
   * 
   * we can also define the callback function in the service and import and use it here.
   * const loggedInUser = useSelector(getLoggedInUser);
   */
  const loggedInUser = useSelector(getLoggedInUser);

  const location = useLocation();
  let newLocation = location;
  if(!newLocation.state) {
    newLocation.state = {}
  }
  newLocation.state.breadcrumbs = breadcrumbs;


  if((role || login) && !loggedInUser) {
    return <Redirect to={{pathname: "/user/login", state: { from: location }}}/>
  } else if(role && loggedInUser?.roles?.indexOf[role] === -1) {
    return <Redirect to={{pathname: "/unauthorized"}}/>
  } else {
    return (
      <Route
        exact={exact}
        path={path}
        component={component}
        location={newLocation}
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
