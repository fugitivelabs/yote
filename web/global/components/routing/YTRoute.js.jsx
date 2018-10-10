/**
 * Helper component to create a Link to a specific role-protected page (like "admin")
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, withRouter } from 'react-router-dom';

import _ from 'lodash';
import omit from 'lodash/omit';

import Auth from '../../utils/auth';

class YTRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      breadcrumbs
      , history
      , location
      , login
      , role
    } = this.props;

    let newLocation = location;
    if(!newLocation.state) {
      newLocation.state = {}
    }
    newLocation.state.breadcrumbs = breadcrumbs;
    const props = _.omit(this.props, [
      'location',
    ]);
    if((role || login) && Auth.notLoggedIn()) {
      return <Redirect to={{pathname: "/user/login", state: { from: location }}}/>
    } else if(role && Auth.notRole(role)) {
      return <Redirect to={{pathname: "/unauthorized"}}/>
    } else {
      return <Route {...props} location={newLocation}  />
    }
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

export default withRouter(YTRoute);
