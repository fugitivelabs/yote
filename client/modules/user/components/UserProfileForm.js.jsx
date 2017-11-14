// import primary libaries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// import form components
import {
  TextInput
  , EmailInput
} from '../../../global/components/forms';

function UserProfileForm({ handleFormChange, handleFormSubmit, user }) {
  return (

        <div className="form-container">
          <form name="userForm" className=" user-form" onSubmit={handleFormSubmit}>
            <EmailInput
              name="username"
              label="Email"
              value={user.username}
              change={handleFormChange}
              required={true}
              disabled={true}
            />
            <TextInput
              name="firstName"
              label="First Name"
              value={user.firstName}
              change={handleFormChange}
              required={false}
              />
            <TextInput
              name="lastName"
              label="Last Name"
              value={user.lastName}
              change={handleFormChange}
              required={false}
            />
          </form>
        </div>

  )
}

UserProfileForm.propTypes = {
  handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
}

export default withRouter(UserProfileForm);
