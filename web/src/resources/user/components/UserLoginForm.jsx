// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

// import form components
import { EmailInput, PasswordInput } from '../../../global/components/forms'

const UserLoginForm = ({
  handleChange
  , handleSubmit
  , user
}) => {
  const location = useLocation();


  return (
    <div className="border border-solid bg-white shadow-sm rounded-sm mx-auto max-w-lg p-4 mt-16">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1 className="px-2"> Sign In </h1>
        <EmailInput
          name="username"
          label="Email Address"
          value={user.username}
          change={handleChange}
          required={true}
        />
        <PasswordInput
          name="password"
          label="Password"
          value={user.password}
          change={handleChange}
          required={true}
        />
        <div className="p-2">
          <button className="text-sm p-2 px-8 rounded-full border border-solid bg-white text-gray-800 border border-gray-800 cursor-pointer no-underline font-semibold" type="submit" >Sign in</button>
        </div>
      </form>

      <p className="p-2 text-sm">
        Forgot your password?
        <Link 
          to="/user/forgot-password" 
          className="mx-2"
        >
          Reset it here
        </Link>
      </p>
      <p className="p-2 text-sm">
        Need an account?
        <Link
          className="mx-2"
          to={{
            pathname: "/user/register"
            , state: location.state
          }}
        >
          Register
        </Link>
      </p>
    </div>
  )
}

UserLoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired
  , handleSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
}

export default UserLoginForm;
