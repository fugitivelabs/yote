/**
 * View component for /user/register
 *
 * On successful registration this component forwards the user back to referrer
 * or to the root if there is no referrer.
 *
 * NOTE: upon reaching this page, user can toggle between /user/login and
 * /user/register without changing the original referring source route.
 */
// import primary libraries
import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendRegister } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.jsx';
import UserRegisterForm from '../components/UserRegisterForm.jsx';

const UserRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState({username: '', password: ''});

  const handleFormSubmit = async e => {
    e.preventDefault();
    const { payload: loggedInUser, error } = await dispatch(sendRegister(user));
    // adapted from: https://reactrouter.com/web/example/auth-workflow
    const from = location.state.from || { pathname: "/" };
    if(loggedInUser) {
      history.replace(from.pathname, location.state);
    } else {
      alert(error.message || "There was a problem registering")
    }
  }

  return (
    <UserLayout title="Register">
      <UserRegisterForm
        user={user}
        handleFormChange={e => setUser({...user, [e.target.name]: e.target.value})}
        handleFormSubmit={handleFormSubmit}
      />
    </UserLayout>
  )
}

export default UserRegister
