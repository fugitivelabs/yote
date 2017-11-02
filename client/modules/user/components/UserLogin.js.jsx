// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, history, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import actions actions
import * as userActions from '../userActions';

// import form components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";

// import user components
import UserLoginForm from './UserLoginForm.js.jsx';

class UserLogin extends Base {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , redirectToReferrer: false
      , user: {
        username: ''
        , password: ''
      }
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
      , '_toggleErrorModal'
      , '_goToResetPass'
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }

  _handleFormChange(e) {
    var nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    const { dispatch, location } = this.props;
    dispatch(userActions.sendLogin(this.state.username, this.state.password)).then((action) => {
      if(action.success) {
        // if (location.state && location.state.nextPathname) {
        //   history.push(location.state.nextPathname);
        // } else {
        //   history.push('/');
        // }
        this.setState({redirectToReferrer: true});
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    })
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  _goToResetPass() {
    history.push('/user/forgot-password')
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, user } = this.state;

    if(redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    } else {
      return  (
        <div className="yt-container">
          <div className="yt-row center-horiz">
            <UserLoginForm
              user={user}
              handleFormSubmit={this._handleFormSubmit}
              handleFormChange={this._handleFormChange}
              location={this.props.location}
            />
          </div>
          <AlertModal
            alertMessage={this.state.errorMessage}
            alertTitle="Error with sign in"
            closeAction={this._toggleErrorModal}
            confirmAction={this._toggleErrorModal}
            confirmText="Try again"
            declineText="Reset Password"
            declineAction={this._goToResetPass}
            isOpen={this.state.isErrorModalOpen}
            type="danger"
          />
        </div>
      )
    }
  }
}

UserLogin.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {}
}

export default withRouter(
  connect(
    mapStoreToProps
  )(UserLogin)
);
