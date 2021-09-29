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
    <div class="card max-w-lg p-4 mt-16">
      <form name="userForm" onSubmit={handleSubmit}>
        <h1 className="px-2">Register</h1>
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
        <div className="p-2">
          <button className="btn" type="submit" >Register</button>
        </div>
      </form>
      <p className="p-2 text-sm">
        Already have an account? 
        <Link
          to={{
            pathname: "/user/login"
            , state: location.state
          }}
          className="mx-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

UserRegisterForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserRegisterForm;
