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
    <div className="">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1> Sign In </h1>
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
        <Link
          className=""
          to={{
            pathname: "/user/register"
            , state: location.state
          }}
        >
          Register
        </Link>
        <button className="" type="submit" > Sign in </button>
        <Link to="/user/forgot-password">
          <em>
            Forgot Password?
          </em>
        </Link>
      </form>
    </div>
  )
}

UserLoginForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserLoginForm;
