// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

// import hooks
import { useFormState } from '../../../global/utils/customHooks';

// import form components
import { EmailInput, PasswordInput } from '../../../global/components/forms'

const UserRegisterForm = ({
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
    <div>
      <form name="userForm" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <EmailInput
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
          to={{
            pathname: "/user/login"
            , state: location.state
          }}
        >
          Sign in
        </Link>
        <button className="" type="submit" > Register </button>
      </form>
    </div>
  )
}

UserRegisterForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserRegisterForm;
