/**
 * View component for /user/login
 *
 * On render cycle this component checks to see if the redirectToReferrer boolean
 * is true (flipped on successful login).  If true, send the user back to the
 * referring page.  If false, show user login form.
 *
 * NOTE: upon reaching this page, user can toggle between /user/login and
 * /user/register without changing the original referring source route.
 */
// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendLogin } from '../authStore';

// import user components
import UserLayout from '../components/UserLayout.js.jsx';
import UserLoginForm from '../components/UserLoginForm.js.jsx';

const UserLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = async (userInfo) => {
    const { payload: result } = await dispatch(sendLogin(userInfo));
    // adapted from: https://reactrouter.com/web/example/auth-workflow
    const { from } = location.state || { from: { pathname: "/"} }
    if(result.success) {
      history.replace(from);
    } else {
      // _toggleErrorModal()
      alert(result.message)
    }
  }

  // const _toggleErrorModal = () => {
  //   this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  // }

  // const _goToResetPass = () => {
  //   const { history } = this.props;
  //   history.push('/user/forgot-password')
  // }

  return  (
    <UserLayout>
      <div className="container">
        <div className="mx-auto">
          <UserLoginForm
            user={{username: '', password: ''}}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
        {/* <AlertModal
          alertMessage={this.state.errorMessage}
          alertTitle="Error with sign in"
          closeAction={this._toggleErrorModal}
          confirmAction={this._toggleErrorModal}
          confirmText="Try again"
          declineText="Reset Password"
          declineAction={this._goToResetPass}
          isOpen={this.state.isErrorModalOpen}
          type="danger"
        /> */}
      </div>
    </UserLayout>
  )
}

export default UserLogin
