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

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFormState } from '../../../global/utils/customHooks';

import { sendCheckResetToken, sendResetPassword } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.jsx';
import { EmailInput } from '../../../global/components/forms'


const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { token } = useParams();

  // const { error } = 

  const [emailObj, handleChange] = useFormState(''); // pass user as initialState


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("HANDLE SUBMIT", emailObj)
    // const { error } = await dispatch(sendRequestReset(emailObj.email));
    // if(error) {
    //   alert(error.message || "There was a problem reseting your password. Please try again")
    // } else {
    //   alert("You should receive an email shortly with instructions on how to reset your password if you have a matching account in our system.")
    // }
  }

  return  (
    <UserLayout title="Reset Password">
          <div className="border border-solid bg-white shadow-sm rounded-sm mx-auto max-w-lg p-4 mt-16">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1 className="px-2">Reset Your Password</h1>
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

export default ResetPassword
