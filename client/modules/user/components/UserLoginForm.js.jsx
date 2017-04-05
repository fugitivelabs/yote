// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { EmailInput, PasswordInput } from '../../../global/components/forms';

function UserLoginForm({ user, handleFormSubmit, handleFormChange }) {
  return (
    <div className="form-container -slim">
      <form name="userForm" className="user-form" onSubmit={handleFormSubmit}>
        <h2> Sign In </h2>
        <hr/>
        <EmailInput
          name="username"
          label="Email Address"
          value={user.username}
          change={handleFormChange}
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
      <Link to="/user/forgot-password">
          <em>
            Forgot Password?
          </em>
        </Link>
        <div className="input-group">
          <div className="yt-row right">
            <Link to="/user/register" className="yt-btn link">Register</Link>
            <button className="yt-btn " type="submit" > Sign in </button>
          </div>
        </div>
      </form>
    </div>
  )
}

UserLoginForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
}

export default UserLoginForm;
