// import form components
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

// import actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";

// import form components
import { PasswordInput } from '../../../global/components/forms';

class ResetPassword extends Base {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , password: ""
      , passwordErrorMessage: ""
      , passwordValid: true
      , password2: ""
      , password2ErrorMessage: ""
      , password2Valid: true
    };
    this._bind(
      '_confirmPassword'
      , '_handleFormChange'
      , '_handleFormSubmit'
      , '_toggleErrorModal'
      , '_validatePassword'
    );
  }

  componentDidMount() {
    this.props.dispatch(userActions.sendCheckResetHex(this.props.params.hex));
  }

  _confirmPassword(e) {
    if(this.state.password !== this.state.password2) {
      this.setState({
        password2Valid: false
        , password2ErrorMessage: "Passwords don't match"
      });
    } else {
      this.setState({
        password2Valid: true
        , password2ErrorMessage: ""
      })
    }
  }

  _handleFormChange(e) {
    var nextState = this.state;
    nextState[e.target.name] = e.target.value;
    if(nextState.password === nextState.password2) {
      nextState.password2Valid = true;
      nextState.password2ErrorMessage = "";
    }
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendResetPassword(this.props.params.hex, this.state.password)).then((action) =>{
      if(action.success) {
        browserHistory.push('/user/login');
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    });
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  _validatePassword(e) {
    if(this.state.password.length < 5 ) {
      this.setState({
        passwordValid: false
        , passwordErrorMessage: "Password must be at least 6 characters long and contain a number and an uppercase letter."
      })
    } else {
      this.setState({
        passwordValid: true
        , passwordErrorMessage: ""
      })
    }
  }

  render() {
    const {
      password
      , passwordErrorMessage
      , passwordValid
      , password2
      , password2ErrorMessage
      , password2Valid
    } = this.state;
    let isDisabled = true;
    if(password.length > 6 && password2 === password) {
      isDisabled = false
    }
    return  (
      <div className="yt-container">
        <div className="yt-row center-horiz">
          { this.props.user.isFetching ?
            <h3>Loading...</h3>
            :
            <div className="form-container -slim">

              { this.props.user.resetTokenValid ?
                <form name="userForm" className="user-form" onSubmit={this._handleFormSubmit}>
                  <h2>Reset Password</h2>
                  <hr/>
                  <PasswordInput
                    change={this._handleFormChange}
                    errorMessage={passwordErrorMessage}
                    handleBlur={this._validatePassword}
                    isValid={passwordValid}
                    label="New Password"
                    name="password"
                    required={true}
                    value={password}
                  />
                  <PasswordInput
                    change={this._handleFormChange}
                    errorMessage={password2ErrorMessage}
                    handleBlur={this._confirmPassword}
                    isValid={password2Valid}
                    label="Confirm Password"
                    name="password2"
                    required={true}
                    value={password2}
                  />
                  <div className="input-group">
                    <div className="yt-row right">
                      <Link to={"/user/login"} className="yt-btn link"> Back To Login </Link>
                      <button className="yt-btn " type="submit" disabled={isDisabled}> Send Password Reset </button>
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

    )
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn }
}

export default connect(
  mapStoreToProps
)(ResetPassword);
