// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, PasswordInput } from '../../../global/components/forms';

function UserLoginForm({ user, handleFormSubmit, handleFormChange }) {
  return (
    <div className="yt-container">
      <h1> Login </h1>
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="userForm" className="card user-form" onSubmit={handleFormSubmit}>
            <TextInput
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
            <div className="input-group">
              <div className="yt-row space-between">
                <button className="yt-btn " type="submit" > Login </button>
              </div>
              <br/>
              <div className="yt-row space-between u-pullRight">
                <Link to={"/user/forgotpassword"} className="yt-btn fowler x-small"> Forgot Password? </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

UserLoginForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
}

export default UserLoginForm;
