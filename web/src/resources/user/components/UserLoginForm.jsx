// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

// import hooks
import { useFormState } from '../../../global/utils/customHooks';

// import form components
// import { EmailInput, PasswordInput } from '../../../global/components/forms';
import { TextInput, PasswordInput } from '../../../global/components/forms'

const UserLoginForm = ({
  handleFormSubmit
  , user
}) => {
  const location = useLocation();

  const [updatedUser, handleChange] = useFormState(user); // pass user as initialState
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(updatedUser)
  }

  return (
    <div className="max-w-lg border border-solid bg-white shadow-sm rounded-sm mx-auto p-4 mt-16">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1 class="px-2">Sign In</h1>
        <TextInput
          name="username"
          label="Email Address"
          value={updatedUser.username}
          change={handleChange}
          required={true}
        />
        <PasswordInput
          name="password"
          label="Password"
          value={updatedUser.password}
          change={handleChange}
          required={true}
        />


        <div className="p-2">
          <button className="text-base p-2 px-8 rounded-sm border border-solid bg-orange-500 text-blue-50 cursor-pointer" type="submit" >Sign in</button>
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
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserLoginForm;
