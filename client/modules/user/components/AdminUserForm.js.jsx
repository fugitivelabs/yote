import React, { PropTypes } from 'react'
import { Link } from 'react-router';

import { TextInput, EmailInput, PasswordInput, SimpleArrayEditor } from '../../../global/components/forms';

const AdminUserForm = ({ user, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle }) => {
  const buttonText = formType === "create" ? "Create User" : "Update User";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      {header}
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
            { formType == "create" ?
              <PasswordInput
                name="password"
                label="Password"
                value={user.password}
                change={handleFormChange}
                required={true}
                password={true}
              />
              : null
            }
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
            <small className="input-helper">by default, either 'admin' or null </small>

            <div className="input-group">
              <div className="yt-row space-between">
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

AdminUserForm.propTypes = {
  user: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
}

export default AdminUserForm;
