/**
 * Global AdminTopNav component.
 */

// import primary libararies
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import components
import Base from '../../../global/components/BaseComponent.js.jsx';
import CloseWrapper from '../../../global/components/helpers/CloseWrapper.js.jsx';
import ProfileDropdownNav from '../../../global/components/navigation/ProfileDropdownNav.js.jsx';

// import module components
import MoreDropdown from './MoreDropdown.js.jsx';

// import admin styles
import adminStyles from '../adminModuleStyles.css';

class AdminTopNav extends Base {
  constructor(props, context) {
    super(props);
    this.state = {
      moreOpen: false
      , profileOpen: false
    }
    this._bind(
      '_openMore'
      , '_openProfile'
      , '_closeDropdowns'
    );
  }

  _openProfile() {
    this.setState({
      profileOpen: true
    });
  }

  _openMore() {
    this.setState({
      moreOpen: true
    });
  }

  _closeDropdowns() {
    this.setState({
      moreOpen: false
      , profileOpen: false
    });
  }

  render() {
    let { loggedInUser } = this.props;
    let { profileOpen } = this.state;


    let pictureUrl = '/img/defaults/profile.png';
    if(loggedInUser && loggedInUser.profilePicUrl) {
      pictureUrl = loggedInUser.profilePicUrl;
    }
    // console.log(pictureUrl);

    let profileImg = {backgroundImage: `url(${pictureUrl})`};

    return(
      <header className="header fixed admin-top-nav">
        <div className="topbar">
          <CloseWrapper
            isOpen={(this.state.profileOpen || this.state.moreOpen)}
            closeAction={this._closeDropdowns}
          />
          <div className="titles">
            <NavLink to="/admin" className="nav-logo" >
              <img src="/img/admin-logo.png"/>
            </NavLink>
          </div>
          <div className="actions">
            <div className="yt-row space-between center-vert">
              <ul className="navigation">
                <li>
                  <NavLink to="/admin" exact={true}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/authoring" >Content Authoring</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/analytics" >Analytics</NavLink>
                </li>
                <li className="dropdown">
                  <span className="action-link" onClick={this._openMore}>More <i className="-more-icon fas fa-caret-down"/></span>
                  <MoreDropdown
                    close={this._closeDropdowns}
                    isOpen={this.state.moreOpen}
                  />
                </li>

              </ul>
              <ul className="navigation">
                { loggedInUser.username ?
                    <li className="dropdown">
                      <span className="action-link" onClick={this._openProfile}>
                        <div className="-profile-pic" style={profileImg} />
                      </span>
                      <ProfileDropdownNav
                        close={this._closeDropdowns}
                        isOpen={this.state.profileOpen}
                      />
                    </li>
                  :
                    null
                }
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }

}

AdminTopNav.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    loggedInUser: store.user.loggedIn.user
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminTopNav)
);
