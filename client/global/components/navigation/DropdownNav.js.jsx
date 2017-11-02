/**
 * Basic dropdown navigation menu to be used with default global TopNav
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group';
import { Link, history } from 'react-router-dom';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../../../modules/user/userActions';

// import components
import Base from "../BaseComponent.js.jsx";

class DropdownNav extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_logout'
    )
  }

  _logout(e) {
    this.props.dispatch(userActions.sendLogout()).then((action) => {
      if(action.success) {
        // redirect to index
        history.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + action.message);
      }
    })
  }

  render() {
    const { user, isOpen } = this.props;
    if(isOpen) {
      let pictureUrl = '/img/defaults/profile.png';
      if(user && user.profilePicUrl) {
        pictureUrl = user.profilePicUrl;
      }
      // console.log(pictureUrl);

      let profileImg = {backgroundImage: `url(${pictureUrl})`};
      return(
        <CSSTransitionGroup
          transitionName="dropdown-anim"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnter={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={350}
        >
        <ul className="dropMenu">
          <div>
            <li className="-drop-header">
              <div className="-profile-pic" style={profileImg} />
              <div className="-profile-info">
                {user.firstName + " "} {user.lastName}
                <br/>
                <small>{user.username}</small>
              </div>
            </li>
            <li><Link to="/profile">My Profile </Link></li>

            { user.roles && user.roles.indexOf('admin') > -1
              ?
              <li><Link to="/admin" target="_blank" > Go to Admin <i className="fa fa-external-link"/> </Link></li>
              : ''
            }
            <li role="separator" className="-divider"/>
            <li><a onClick={this._logout}>Logout</a></li>
          </div>
        </ul>
        </CSSTransitionGroup>
      )
    } else {
      return (
        <CSSTransitionGroup
          transitionName="dropdown-anim"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnter={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={350}
        />
      )
    }
  }
}

DropdownNav.propTypes = {
  dispatch: PropTypes.func.isRequired
  , isOpen: PropTypes.bool.isRequired
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default connect(
  mapStoreToProps
)(DropdownNav);
