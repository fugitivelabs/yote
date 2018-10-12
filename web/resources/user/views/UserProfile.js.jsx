/**
 * View component for /profile
 *
 * Display logged in user's own profile information and lets them update if
 * they want.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import third-party libraries
import classNames from 'classnames';
import moment from 'moment';

// import actions
import * as userActions from '../userActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import user components
import UserProfileLayout from '../components/UserProfileLayout.js.jsx';
import UpdateProfileModal from '../components/UpdateProfileModal.js.jsx';

class UserProfile extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      updateModalOpen: false
      , newUserData: this.props.user || {}
      , changeCount: 0
    }
    this._bind(
      '_closeUpdateModal'
      , '_handleFormChange'
      , '_handleFormSubmit'
      , '_openUpdateModal'
    );
  }

  _openUpdateModal() {
    const { user } = this.props;
    var newUserInfo = JSON.parse(JSON.stringify(user));
    this.setState({
      updateModalOpen: true
      , newUserData: newUserInfo
    })
  }

  _closeUpdateModal(){
    this.setState({
      updateModalOpen: false
      , newUserData: {}
    });
  }

  _handleFormChange(e) {

    let newUser = _.update( this.state.newUserData, e.target.name, function() {
      return e.target.value;
    });

    /**
     * Tell child components to rerender
     *
     * NOTE: this is hacky
     */
    let changeCount = this.state.changeCount;
    changeCount++;

    this.setState({
      newUserData: newUser
      , changeCount
    });
  }

  _handleFormSubmit(e) {
    const { dispatch } = this.props;
    var newState = this.state.newUserData;
    dispatch(userActions.sendUpdateProfile(newState)).then((action)=> {
      this._closeUpdateModal();
    });
  }


  render() {
    const { user } = this.props;

    let pictureUrl = user.profilePicUrl || '/img/defaults/profile.png';

    let isEmpty = !user._id;
    return (
      <UserProfileLayout>
        <div className="flex ">
          <section className="section ">
            <div className="yt-container">
              <button className="yt-btn small u-pullRight" onClick={this._openUpdateModal}>Update Profile</button>
              <h1>My Profile </h1>
              <hr/>
              { !isEmpty ?
                <div className="yt-row with-gutters ">
                  <div className="yt-col full l_25">
                    <img src={pictureUrl} alt="profile pic" />
                  </div>
                  <div className="yt-col full l_50">
                    <h4>Info</h4>
                    <p> {user.firstName} {user.lastName}</p>
                    <p> {user.username}</p>
                  </div>
                </div>
                :
                null
              }
            </div>
          </section>
          <UpdateProfileModal
            newUserData={this.state.newUserData}
            isModalOpen={this.state.updateModalOpen}
            closeModal={this._closeUpdateModal}
            changeCount={this.state.changeCount}
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        </div>
      </UserProfileLayout>
    )
  }
}

UserProfile.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(UserProfile)
);
