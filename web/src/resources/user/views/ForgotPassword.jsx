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

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFormState } from '../../../global/utils/customHooks';

import { sendLogin } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.jsx';
import { EmailInput } from '../../../global/components/forms'


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [emailObj, handleChange] = useFormState(''); // pass user as initialState


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("HANDLE SUBMIT", emailObj)
    // const { payload: loggedInUser, error } = await dispatch(sendLogin(userInfo));
    // // adapted from: https://reactrouter.com/web/example/auth-workflow
    // const from = location.state.from || { pathname: "/" };
    // if(loggedInUser) {
    //   history.replace(from.pathname, location.state);
    // } else {
    //   alert(error.message || "There was a problem logging in. Please try again")
    // }
  }

  return  (
    <UserLayout title="Forgot Password">
          <div className="border border-solid bg-white shadow-sm rounded-sm mx-auto max-w-lg p-4 mt-16">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1 className="px-2">Forgot Password</h1>
        <EmailInput
          name="email"
          label="Email Address"
          value={emailObj.email}
          change={handleChange}
          required={true}
        />
        <div className="p-2">
          <button className="text-sm p-2 px-8 rounded-full border border-solid bg-white text-gray-800 border border-gray-800 cursor-pointer no-underline font-semibold" type="submit" >Submit</button>
        </div>
      </form>
      <p className="p-2 text-sm">
        <Link
          className="mx-2"
          to={{
            pathname: "/user/login"
            , state: location.state
          }}
        >
          Login
        </Link>
      </p>
    </div>
    </UserLayout>
  )
}

export default ForgotPassword
