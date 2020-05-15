// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import {
  EmailInput
  , NewPasswordInput
  , TextInput
} from '../../../global/components/forms';

const UserRegisterForm = ({
  confirmPassword
  , handleFormChange
  , handleFormSubmit
  , location
  , user
}) => {
  let isDisabled = true;
  if(user.password && user.username) {
    isDisabled = false
  }
  return (
    <div className="form-container -skinny">
      <form name="userForm" className="user-form" onSubmit={handleFormSubmit}>
        <h2> Register for Yote</h2>
        <hr/>
        <EmailInput
          change={handleFormChange}
          label="Email Address"
          name="username"
          required={true}
          value={user.username}
        />
        <NewPasswordInput
          change={handleFormChange}
          label="Password"
          name="password"
          value={user.password}
        />
        <TextInput
          change={handleFormChange}
          label="First Name"
          name="firstName"
          required={false}
          value={user.firstName}
          />
        <TextInput
          change={handleFormChange}
          label="Last Name"
          name="lastName"
          required={false}
          value={user.lastName}
        />
        <div className="input-group">
          <div className="yt-row right">
            <Link
              className="yt-btn link"
              to={{
                pathname: "/user/login"
                , state: location.state
              }}
            >
              Sign in
            </Link>
            <button className="yt-btn " type="submit" disabled={isDisabled}> Register </button>
          </div>
        </div>
      </form>
    </div>
  )
}

UserRegisterForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserRegisterForm;
