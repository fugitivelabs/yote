/**
 * View component for /user/reset-password/:hex
 *
 * Reached from a reset password link within an email.  Checks mactch.params.hex
 * against the reset hex for that user in the database.  If valid, allows the
 * user to reach the reset-password form.  If not, displays "invalid" message
 */

// import form components
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
import { NewPasswordInput } from '../../../global/components/forms';

// import user components
import UserLayout from '../components/UserLayout.js.jsx';

class ResetPassword extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , password: ""
      , submitting: false
    };
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
      , '_toggleErrorModal'
    );
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(userActions.sendCheckResetHex(match.params.hex));
  }

  _handleFormChange(e) {
    let nextState = this.state;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const { dispatch, history, match } = this.props;
    this.setState({submitting: true});
    dispatch(userActions.sendResetPassword(match.params.hex, this.state.password)).then((action) =>{
      this.setState({submitting: false});
      if(action.success) {
        history.push('/user/login');
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    });
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  render() {
    const { user } = this.props;
    const { password , submitting} = this.state;
    let isDisabled = !password;
    return  (
      <UserLayout>
        <div className="yt-container">
          <div className="yt-row center-horiz">
            { user.isFetching ?
              <h3>Loading...</h3>
              :
              <div className="form-container -skinny">
                { user.resetTokenValid ?
                  <form name="userForm" className="user-form" onSubmit={this._handleFormSubmit}>
                    <h2>Reset Password</h2>
                    <hr/>
                    <NewPasswordInput
                      change={this._handleFormChange}
                      name="password"
                      value={password}
                    />
                    <div className="input-group">
                      <div className="yt-row right">
                        <Link to={"/user/login"} className="yt-btn link"> Back To Login </Link>
                        <button className="yt-btn " type="submit" disabled={isDisabled || submitting}>
                          { submitting ?
                            <span>Sending...</span>
                            :
                            <span>Send Password Reset </span>
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                  :
                  <form>
                    <h2>The password reset token is invalid or has expired. Please visit the forgot password page to request a new token.</h2>
                    <br/>
                    <br/>
                    <div className="input-group">
                      <Link to={"/user/forgot-password"} className="yt-btn"><i className="fa fa-angle-double-left" /> Forgot Password </Link>
                    </div>
                  </form>
                }
              </div>
            }
          </div>
          <AlertModal
            alertMessage={
              <div>
                <strong>
                  {this.state.errorMessage}
                </strong>
                <br/>
                <div>Please try again.</div>
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

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(ResetPassword)
);
