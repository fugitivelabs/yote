/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

// import components
import ForgotPassword from './ForgotPassword.js.jsx';
import ResetPassword from './ResetPassword.js.jsx';
import UserLogin from './UserLogin.js.jsx';
import UserRegister from './UserRegister.js.jsx';

class UserLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout">
        <div className="body with-header -gray">
          <Switch>
            <Route path="/user/login" component={UserLogin} />
            <Route path="/user/register" component={UserRegister} />
            <Route path="/user/reset-password/:hex" component={ResetPassword} />
            <Route path="/user/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default UserLayout;
