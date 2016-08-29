import React, { PropTypes } from 'react'
import { Link } from 'react-router';

import { TextInput, EmailInput, PasswordInput, SimpleArrayEditor, SelectFromObject } from '../../../global/components/forms';

const UserRegisterForm = ({ user, handleFormSubmit, handleFormChange }) => {
  console.log("register form loading");
  return (
    <div className="yt-container">
      <div className="yt-row">
        <Link className="" to="/admin/users">&larr; Cancel</Link>
      </div>
      <div className="form-header">
        <h3 > Create New User </h3>
        <hr/>
      </div>
      <div className="yt-row center-horiz">
        <div className="form-container yt-col full s_75 m_50">
          <form name="userForm" className="user-form" onSubmit={handleFormSubmit}>
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
            <SimpleArrayEditor
              name="roles"
              label="User Roles"
              items={user.roles}
              arrayType="string"
              change={handleFormChange}
            />
            <small className="input-helper">must be one of 'admin', 'author', 'customer' </small>

            <div className="input-group">
              <div className="yt-row right">
                <button className="yt-btn " type="submit" > Create This User </button>
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
