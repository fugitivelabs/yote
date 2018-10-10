/**
 * View component for /user/forgot-password
 *
 * allows user to submit a password reset request to their email on record.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Binder from '../../../global/components/Binder.js.jsx';

// import form components
import { EmailInput } from '../../../global/components/forms';

// import user components
import UserLayout from '../components/UserLayout.js.jsx';

class ForgotPassword extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , isSuccessModalOpen: false
      , username: ""
    };
    this._bind(
      '_closeSuccessModal'
      , '_handleFormChange'
      , '_handleFormSubmit'
      , '_openSuccessModal'
      , '_toggleErrorModal'
    );
  }

  _handleFormChange(e) {
    var nextState = this.state;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(userActions.sendForgotPassword(this.state.username)).then((action) => {
      if(action.success) {
        this._openSuccessModal();
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    })
  }

  _openSuccessModal() {
    this.setState({isSuccessModalOpen: true});
  }

  _closeSuccessModal() {
    this.setState({isSuccessModalOpen: false});
    const { history } = this.props;
    history.push('/');
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  render() {
    const { user } = this.props;
    return  (
      <UserLayout>
        <div className="yt-container">
          <div className="yt-row center-horiz">
            <div className="form-container -skinny">
              <form name="forgotPassowrdForm" className="user-form" onSubmit={this._handleFormSubmit}>
                <h2> Forgot Password </h2>
                <hr/>
                <EmailInput
                  name="username"
                  label="Email Address"
                  value={this.state.username}
                  change={this._handleFormChange}
                  required={true}
                />
                <div className="input-group">
                  <div className="yt-row right">
                    <Link to={"/user/login"} className="yt-btn link"> Back To Login </Link>
                    <button className="yt-btn " type="submit" disabled={user.isFetching}>
                      {user.isFetching ?
                        <span>Sending...</span>
                        :
                        <span>Send Password Reset</span>
                      }
                     </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <AlertModal
            alertMessage="You should receive an email shortly with password reset instructions."
            alertTitle="Success"
            closeAction={this._closeSuccessModal}
            confirmAction={this._closeSuccessModal}
            confirmText="Go it"
            isOpen={this.state.isSuccessModalOpen}
            type="info"
          />
          <AlertModal
            alertMessage={
              <div>
                <strong>
                  {this.state.errorMessage}
                </strong>
                <br/>
                <div>You may need to contact a study coordinator.</div>
              </div>
            }
            alertTitle="Error"
            closeAction={this._toggleErrorModal}
            confirmAction={this._toggleErrorModal}
            confirmText="Try again"
            isOpen={this.state.isErrorModalOpen}
            type="danger"
          />
        </div>
      </UserLayout>
    )
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(ForgotPassword)
);
