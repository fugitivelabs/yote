/**
 * The navbar on the landing page is styled a little differently
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';
import { DateTime } from 'luxon';

// import global components
import Base from '../../../global/components/BaseComponent.js.jsx';
import CloseWrapper from '../../../global/components/helpers/CloseWrapper.js.jsx';
import ProfileDropdownNav from '../../../global/components/navigation/ProfileDropdownNav.js.jsx';
import RomrLogo from '../../../global/components/RomrLogo.js.jsx';

// import css modules
import landingStyles from '../landingStyles.css';

class LandingNavDesktop extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
    );
  }

  _openDropdown(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  _closeDropdown() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { isScrolled, user } = this.props;

    let headerClass = classNames(
      'landing-header'
      , { 'translucent': !isScrolled }
    )

    let topClass = classNames(
      "topbar yt-container fluid"
      , { 'transparent': !isScrolled }
    )

    let loginClass = classNames(
      "yt-btn small link"
      , { 'light': !isScrolled }
    )

    // let pictureUrl = '/img/defaults/profile.png';
    let profileImg = {backgroundImage: `url('/img/defaults/profile.png')`};
    if(user && user.profilePicUrl) {
      profileImg = {backgroundImage: `url('${user.profilePicUrl}')`};
    } else {
      profileImg = {background: `#fff url('/img/placeholders/${DateTime.fromISO(user.created).toFormat('h')}.png') repeat`}
    }


    return (
      <div className="desktop-nav-wrapper">
        <header className="header fixed" styleName={headerClass} >
          <div className={topClass} styleName="landing-nav">
            <CloseWrapper
              isOpen={this.state.isOpen}
              closeAction={this._closeDropdown}
              />
            <div className="actions">
              <div className="yt-row center-vert space-between">
                <div styleName="nav-logo">
                  <RomrLogo />
                </div>
                { user.username ?
                  <ul className="navigation">
                    <li styleName="nav-link">
                      <Link to="/places" styleName="-link" className="-link">Browse places</Link>
                    </li>
                    <li styleName="nav-link">
                      <Link to="/events" styleName="-link" className="-link">Browse events</Link>
                    </li>
                    <li styleName="nav-link">
                      <a styleName="-link" className="-link" href="">Become a host</a>
                    </li>
                    <li styleName="nav-link" className="user-dropdown">
                      <div styleName="-action" className="-action -button-wrapper" onClick={this._openDropdown}>
                        <div className="-profile-pic" style={profileImg} />
                        <i className="-drop-icon far fa-angle-down"/>
                      </div>
                      <ProfileDropdownNav
                        isOpen={this.state.isOpen}
                        close={this._closeDropdown}
                        />
                    </li>
                  </ul>
                  :
                  <ul className="navigation">
                    <li styleName="nav-link">
                      <a styleName="-link" className="-link" href="">Become a host</a>
                    </li>
                    <li styleName="nav-link">
                      <a styleName="-link" className="-link" href="">Help</a>
                    </li>
                    <li styleName="nav-link">
                      <Link to="/user/register" styleName="-link" className="-link">Join Rōmr</Link>
                    </li>
                    <li styleName="nav-link">
                      <Link to="/user/login" styleName="-link" className="-link">Sign in</Link>
                    </li>
                  </ul>
                }
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

LandingNavDesktop.propTypes = {
  isScrolled: PropTypes.bool
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(LandingNavDesktop)
);
