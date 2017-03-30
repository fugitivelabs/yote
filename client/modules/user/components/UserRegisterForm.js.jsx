// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, EmailInput, PasswordInput } from '../../../global/components/forms';

function UserRegisterForm({
  confirmPassword
  , handleFormChange
  , handleFormSubmit
  , passwordErrorMessage
  , passwordValid
  , password2ErrorMessage
  , password2Valid
  , user
  , validatePassword
}) {
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
        <PasswordInput
          change={handleFormChange}
          errorMessage={passwordErrorMessage}
          handleBlur={validatePassword}
          isValid={passwordValid}
          label="Password"
          name="password"
          password={true}
          required={true}
          value={user.password}
        />
        <PasswordInput
          change={handleFormChange}
          errorMessage={password2ErrorMessage}
          handleBlur={confirmPassword}
          label="Confirm Password"
          isValid={password2Valid}
          name="password2"
          password={true}
          required={true}
          value={user.password2}
        />
        <TextInput
          change={handleFormChange}
          label="First Name"
          name="firstName"
          required={true}
          value={user.firstName}
          />
        <TextInput
          change={handleFormChange}
          label="Last Name"
          name="lastName"
          required={true}
          value={user.lastName}
        />
        <div className="input-group">
          <div className="yt-row right">
            <Link to="/user/login" className="yt-btn link">Sign in </Link>
            <button className="yt-btn " type="submit" > Register </button>
          </div>
        </div>
      </form>
    </div>
  )
}

UserRegisterForm.propTypes = {
  confirmPassword: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , passwordErrorMessage: PropTypes.string
  , passwordValid: PropTypes.bool
  , password2ErrorMessage: PropTypes.string
  , password2Valid: PropTypes.bool
  , user: PropTypes.object.isRequired
  , validatePassword: PropTypes.func.isRequired
}

UserRegisterForm.defaultProps = {
  passwordErrorMessage: ""
  , passwordValid: true
  , password2ErrorMessage: ""
  , password2Valid: true 
}

export default UserRegisterForm;
