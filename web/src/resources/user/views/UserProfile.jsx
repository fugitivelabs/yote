/**
 * View component for /user/profile
 *
 */
// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoggedInUser } from '../../../resources/user/authService';

import { sendLogout } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.jsx';

const UserRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // use the hook to get the loggedInUser from the authStore
  const loggedInUser = useLoggedInUser();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    history.push("/");
  }
  return (
    <UserLayout title="Profile">
      <h1>My profile</h1>
      <p>{loggedInUser?.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </UserLayout>
  )
}

export default UserRegister
