/**
 * Reusable stateless form component for User by admins
 */

// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import {
  EmailInput
  , PasswordInput
  , SimpleArrayEditor
  , TextInput
} from '../../../global/components/forms';

function AdminUserForm({
  user
  , formType
  , handleDeleteUser
  , handleFormSubmit
  , handleFormChange
  , cancelLink
  , formTitle
}) {

  // set the button text
  const buttonText = formType === "create" ? "Create User" : "Update User";

  // set the form header
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
            { formType === "create" ?
              <PasswordInput
                name="password"
                label="Password"
                value={user.password}
                change={handleFormChange}
                required={true}
                password={true}
              />
              :
              null
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
              helpText={<span>by default, either <strong>admin</strong> or <strong>null</strong></span>}
            />
            <div className="input-group">
              <div className="yt-row space-between">
                { formType === 'update' ?
                  <button className="yt-btn link" type="button" onClick={handleDeleteUser}> Delete User </button>
                  :
                  null
                }
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
  cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleDeleteUser: PropTypes.func
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
}

AdminUserForm.defaultProps = {
  formTitle: ''
  , handleDeleteUser: null
}

export default AdminUserForm;
