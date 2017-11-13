/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

import Auth from '../../utils/auth';

class RoleRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const role = this.props.role;
    if(Auth.notLoggedIn()) {
      return <Redirect to={{pathname: "/user/login", state: { from: this.props.location }}}/>
    } else if(Auth.notRole(role)) {
      return <Redirect to={{pathname: "/unauthorized"}}/>
    } else {
      return <Route {...this.props} />
    }
  }
}

RoleRoute.propTypes = {
  role: PropTypes.string.isRequired
}

export default RoleRoute;
