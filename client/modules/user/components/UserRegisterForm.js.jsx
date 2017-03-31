// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, EmailInput, NewPasswordInput } from '../../../global/components/forms';

function UserRegisterForm({
  confirmPassword
  , handleFormChange
  , handleFormSubmit
  , user
}) {
  let isDisabled = true;
  if(user.password && user.username) {
    isDisabled = false
  }
  return (
    <div className="form-container -slim">
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
            <Link to="/user/login" className="yt-btn link">Sign in </Link>
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
}

export default UserRegisterForm;
