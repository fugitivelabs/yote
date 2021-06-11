/**
 * Global AdminTopNav component.
 */

// import primary libararies
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import components
import Binder from '../../../global/components/Binder.js.jsx';
import CloseWrapper from '../../../global/components/helpers/CloseWrapper.js.jsx';
import ProfileDropdown from '../../../global/components/navigation/ProfileDropdown.js.jsx';

// import module components
import AdminModulesDropdown from './AdminModulesDropdown.js.jsx';


class AdminTopNav extends Binder {
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

    let profileImg = {backgroundImage: `url(${pictureUrl})`};

    return(
      <header className="header fixed admin-top-nav">
        <div className="topbar">
          <CloseWrapper
            isOpen={(this.state.profileOpen || this.state.moreOpen)}
            closeAction={this._closeDropdowns}
          />
          <div className="actions">
            <div className="yt-row space-between center-vert">
              <ul className="navigation">
                <li>
                  <Link to="/"> <i className="fas fa-arrow-left"/>  Main Page</Link>
                </li>
                <li> </li>
                <li>
                  <NavLink to="/admin" exact={true}>Admin Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/style-guide" >Style Guide</NavLink>
                </li>
                <li className="dropdown">
                  <span className="action-link" onClick={this._openMore}>Modules   <i className="-more-icon fas fa-caret-down"/></span>
                  <AdminModulesDropdown
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
                    <ProfileDropdown
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
