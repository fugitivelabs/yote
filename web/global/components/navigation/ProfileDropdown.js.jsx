/**
 * Basic dropdown navigation menu to be used with default global TopNav
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../../../resources/user/userActions';

// import components
import Binder from '../Binder.js.jsx';

class ProfileDropdown extends Binder {
  constructor(props) {
    super(props);
    this._bind(
      '_logout'
    )
  }

  _logout(e) {
    const { dispatch, history } = this.props;
    dispatch(userActions.sendLogout()).then((action) => {
      if(action.success) {
        // redirect to index
        history.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + action.message);
      }
    })
  }

  render() {
    const { close, isOpen, user } = this.props;

    let pictureUrl = '/img/defaults/profile.png';
    if(user && user.profilePicUrl) {
      pictureUrl = user.profilePicUrl;
    }

    let profileImg = {backgroundImage: `url(${pictureUrl})`};
    return(
      <TransitionGroup >
        {isOpen ?
          <CSSTransition
            classNames="dropdown-anim"
            timeout={250}
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
              <li><Link to="/user/profile" onClick={()=> close()}>My Profile </Link></li>

              { user.roles && user.roles.indexOf('admin') > -1
                ?
                <li><Link to="/admin" target="_blank" onClick={()=> close()}> Go to Admin <i className="fa fa-external-link"/> </Link></li>
                : ''
              }
              <li role="separator" className="-divider"/>
              <li><a onClick={this._logout}>Logout</a></li>
            </div>
          </ul>
          </CSSTransition>
          :
          null
        }
      </TransitionGroup>
    )
  }
}

ProfileDropdown.propTypes = {
  close: PropTypes.func.isRequired
  , dispatch: PropTypes.func.isRequired
  , isOpen: PropTypes.bool.isRequired
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(ProfileDropdown)
);
