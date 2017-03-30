// import primary libraries
import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";

// import form components
import { EmailInput } from '../../../global/components/forms';


class ForgotPassword extends Base {
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
    this.props.dispatch(userActions.sendForgotPassword(this.state.username)).then((action) => {
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
    browserHistory.push('/');
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  render() {
    const { user } = this.props;
    return  (
      <div className="yt-container">
        <div className="yt-row center-horiz">
          <div className="form-container -slim">
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
    )
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn }
}

export default connect(
  mapStoreToProps
)(ForgotPassword);
