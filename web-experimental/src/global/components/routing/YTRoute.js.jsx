/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

import Auth from '../../utils/auth';

const YTRoute = ({
  // There is no "this.props". The rest parameter syntax (...) allows us to represent an indefinite number of arguments as an array. More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  ...props
}) => {

  // const location = useLocation();
  // let newLocation = location;
  // if(!newLocation.state) {
  //   newLocation.state = {}
  // }
  // newLocation.state.breadcrumbs = breadcrumbs;
  if((props.role || props.login) && Auth.notLoggedIn()) {
    // return <Redirect to={{pathname: "/user/login", state: { from: location }}}/>
    return <Redirect to={{pathname: "/user/login" }}/>
  } else if(props.role && Auth.notRole(props.role)) {
    return <Redirect to={{pathname: "/unauthorized"}}/>
  } else {
    return (
      <Route exact={props.exact} path={props.path}>
        <props.component breadcrumbs={props.breadcrumbs}/>
      </Route>
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
