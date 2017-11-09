/**
 * Helper component to create a Link to a login-protected page
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

import Auth from '../../utils/auth';

export default class LoginRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(Auth.notLoggedIn()) {
      return <Redirect to={{pathname: "/user/login", state: { from: this.props.location }}}/>
    } else {
      return <Route {...this.props} />
    }
  }
}
