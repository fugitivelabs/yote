// import primary libraries
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

//actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";

// import user components
import UserRegisterForm from './UserRegisterForm.js.jsx';

class UserRegister extends Base {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , isSuccessModalOpen: false
      , passwordErrorMessage: ""
      , passwordValid: true
      , password2ErrorMessage: ""
      , password2Valid: true
      , user: this.props.defaultUser ? JSON.parse(JSON.stringify(this.props.defaultUser)): null
      // NOTE: don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_confirmPassword'
      , '_handleFormChange'
      , '_handleFormSubmit'
      , '_toggleErrorModal'
      , '_validatePassword'
    );
  }

  _confirmPassword(e) {
    console.log('confirmPassword');
    if(this.state.user.password !== this.state.user.password2) {
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
    var nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendRegister(this.state.user)).then((action) => {
      if(action.success) {
        browserHistory.push('/');
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    })
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  _validatePassword(e) {
    if(this.state.user.password.length < 5 ) {
      this.setState({
        passwordValid: false
        , passwordErrorMessage: "Password must be at least 6 characters long."
      })
    } else {
      this.setState({
        passwordValid: true
        , passwordErrorMessage: ""
      })
    }
  }

  render() {
    const { user } = this.state;
    const isEmpty = !user || (user.username === null || user.username === undefined);
    return  (
      <div className="yt-container">
        <div className="yt-row center-horiz">
          { isEmpty ?
            "Loading..."
            :
            <UserRegisterForm
              confirmPassword={this._confirmPassword}
              handleFormChange={this._handleFormChange}
              handleFormSubmit={this._handleFormSubmit}
              passwordErrorMessage={this.state.passwordErrorMessage}
              passwordValid={this.state.passwordValid}
              password2ErrorMessage={this.state.password2ErrorMessage}
              password2Valid={this.state.password2Valid}
              user={user}
              validatePassword={this._validatePassword}
            />
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
          alertTitle="Error with registration"
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

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    defaultUser: store.user.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(UserRegister);
