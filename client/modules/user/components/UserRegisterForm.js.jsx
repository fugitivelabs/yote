import React, { PropTypes } from 'react'
import { Link } from 'react-router';

import { TextInput, EmailInput, PasswordInput } from '../../../global/components/forms';

const UserRegisterForm = ({ user, handleFormSubmit, handleFormChange }) => {
  // console.log("register form loading");
  return (
    <div className="yt-container">
      <h1> Register Account </h1>
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="userForm" className="card user-form" onSubmit={handleFormSubmit}>
            <EmailInput
              name="username"
              label="Email Address"
              value={user.username}
              change={handleFormChange}
              placeholder="Email (required)"
              required={true}
            />
            <PasswordInput
              name="password"
              label="Password"
              value={user.password}
              change={handleFormChange}
              required={true}
              password={true}
            />
            <TextInput
              name="firstName"
              label="First Name"
              value={user.firstName}
              change={handleFormChange}
              required={true}
              />
            <TextInput
              name="lastName"
              label="Last Name"
              value={user.lastName}
              change={handleFormChange}
              required={true}
            />
            <div className="input-group">
              <div className="yt-row space-between">
                <button className="yt-btn " type="submit" > Register </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

UserRegisterForm.propTypes = {
  user: PropTypes.object.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
}

export default UserRegisterForm;
