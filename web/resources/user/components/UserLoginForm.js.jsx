// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// import form components
import { EmailInput, PasswordInput } from '../../../global/components/forms';

const UserLoginForm = ({
  handleFormChange
  , handleFormSubmit
  , location
  , user
}) => {
  return (
    <div className="form-container -skinny">
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
            <Link
              className="yt-btn link"
              to={{
                pathname: "/user/register"
                , state: location.state
              }}
            >
              Register
            </Link>
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
  , location: PropTypes.object
}

export default withRouter(UserLoginForm);
