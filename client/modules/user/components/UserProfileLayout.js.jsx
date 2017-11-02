/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

// import user components
import UserProfile from './UserProfile.js.jsx';

// import utilities
import Auth from '../../../global/utils/auth';

class UserProfileLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout>
        <Switch>
          <Route
            exact path="/profile"
            render={() => (
              Auth.notLoggedIn() ?
                <Redirect to={{
                    pathname: "/user/login"
                    , state: { from: this.props.location }
                  }}
                />
              :
                <UserProfile />
            )}
          />
        </Switch>
      </DefaultLayout>
    )
  }
}

export default UserProfileLayout;
