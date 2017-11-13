/**
 * View component for /user/register
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, history, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";

// import user components
import UserLayout from '../components/UserLayout.js.jsx';
import UserRegisterForm from '../components/UserRegisterForm.js.jsx';

class UserRegister extends Base {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
      , isErrorModalOpen: false
      , redirectToReferrer: false
      , user: this.props.defaultUser ? JSON.parse(JSON.stringify(this.props.defaultUser)): null
      // NOTE: don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
      , '_toggleErrorModal'
    );
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
        this.setState({redirectToReferrer: true});
        // history.push('/');
      } else {
        this.setState({errorMessage: action.error});
        this._toggleErrorModal();
      }
    })
  }

  _toggleErrorModal() {
    this.setState({isErrorModalOpen: !this.state.isErrorModalOpen});
  }

  render() {
    const { redirectToReferrer, user } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const isEmpty = !user || (user.username === null || user.username === undefined);

    if(redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    } else {
      return  (
        <UserLayout>
          <div className="yt-container">
            <div className="yt-row center-horiz">
              { isEmpty ?
                "Loading..."
                :
                <UserRegisterForm
                  handleFormChange={this._handleFormChange}
                  handleFormSubmit={this._handleFormSubmit}
                  user={user}
                  location={this.props.location}
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
        </UserLayout>
      )
    }
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

export default withRouter(
  connect(
    mapStoreToProps
  )(UserRegister)
);
