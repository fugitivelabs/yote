/**
 * View component for /user/login
 *
 * On successful login this component forwards the user back to referrer
 * or to the root if there is no referrer.
 *
 * NOTE: upon reaching this page, user can toggle between /user/login and
 * /user/register without changing the original referring source route.
 */
// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendLogin } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.jsx';
import UserLoginForm from '../components/UserLoginForm.jsx';

const UserLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = async (userInfo) => {
    const { payload: result } = await dispatch(sendLogin(userInfo));
    // adapted from: https://reactrouter.com/web/example/auth-workflow
    const { from } = location.state || { from: { pathname: "/"} }
    if(result.success) {
      history.replace(from);
    } else {
      alert(result.message)
    }
  }

  return  (
    <UserLayout title="Sign in">
      <UserLoginForm
        user={{username: '', password: ''}}
        handleFormSubmit={handleFormSubmit}
      />
    </UserLayout>
  )
}

export default UserLogin
