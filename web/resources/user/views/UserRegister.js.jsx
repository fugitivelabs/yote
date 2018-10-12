/**
 * View component for /user/register
 *
 * On render cycle this component checks to see if the redirectToReferrer boolean
 * is true (flipped on successful registration).  If true, send the user back to
 * the referring page.  If false, show user register form which allows the user
 * to register with the fields defined in the defaultUser object.
 *
 * NOTE: upon reaching this page, user can toggle between /user/login and
 * /user/register without changing the original referring source route.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

//actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Binder from '../../../global/components/Binder.js.jsx';

// import user components
import UserLayout from '../components/UserLayout.js.jsx';
import UserRegisterForm from '../components/UserRegisterForm.js.jsx';

class UserRegister extends Binder {
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
    const { dispatch, history, location } = this.props;
    dispatch(userActions.sendRegister(this.state.user)).then((action) => {
      if(action.success) {
        if(location.state.from) {
          this.setState({redirectToReferrer: true});
        } else {
          history.push('/');
        }
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
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, user } = this.state;

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
