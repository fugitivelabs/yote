/**
 * Global DefaultTopNav component.
 */

// import primary libararies
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import components
import Base from '../BaseComponent.js.jsx';
import CloseWrapper from '../helpers/CloseWrapper.js.jsx';
import ProfileDropdown from './ProfileDropdown.js.jsx';

import { MAIN_NAV_ITEMS } from './navItems.js';

class DefaultTopNav extends Base {
  constructor(props, context) {
    super(props);
    this.state = {
      profileOpen: false
      , scrollingDown: false
      , isTop: true
    }
    this._bind(
      '_handleScroll'
    );
  }

  componentWillMount() {
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll(e) {
    /**
     * When the page scrolls, check the Y position to determine whether to
     * hide, show or fade in DefaultTopNav.
     *
     * @param e = broswer scroll event
     */
    if(!this.props.fancyScroll) {
      return false;
    }

    let scrollTop;
    if(e.target.scrollingElement) {
      scrollTop = e.target.scrollingElement.scrollTop;
    } else {
      scrollTop = document.documentElement.scrollTop;
    }

    // handle initial position
    let isTop = scrollTop < 20 ? true : false;
    if(isTop !== this.state.isTop) {
      this.setState({isTop: isTop});
    }

    // if the page is scrolled down, change the navbar style
    var scrollingDown;
    if ( typeof this._handleScroll.y == undefined ) {
      this._handleScroll.y=window.pageYOffset;
      scrollingDown = false;
    }

    // check last position vs current position
    var diffY=this._handleScroll.y-window.pageYOffset;

    // check the direction of the scroll
    if( diffY<0 ) {
      // Page is scrolling down
      scrollingDown = true;
    } else if( diffY>0 ) {
      // Page is scrolling up
      scrollingDown = false;
    }

    // tell the State about the scroll direction
    if(scrollingDown !== undefined && scrollingDown != this.state.scrollingDown) {
      this.setState({scrollingDown: scrollingDown});
    }

    // set the function's XY position to the current position
    this._handleScroll.x=window.pageXOffset;
    this._handleScroll.y=window.pageYOffset;
  }

  render() {
    let { fancyScroll, fixed, loggedInUser, navClasses } = this.props;
    let { isTop, scrollingDown, isFixed } = this.state;
    let headerClass = classNames(
      'header'
      , navClasses
      , {
        'fixed': fixed
        , 'isHidden': fancyScroll && scrollingDown && !isTop
      }
    )

    let pictureUrl = '/img/defaults/profile.png';
    if(loggedInUser && loggedInUser.profilePicUrl) {
      pictureUrl = loggedInUser.profilePicUrl;
    }

    let profileImg = { backgroundImage: `url(${pictureUrl})` };

    return(
      <header className={headerClass}>
        <div className="topbar main-container">
          <CloseWrapper
            isOpen={this.state.profileOpen}
            closeAction={() => this.setState({profileOpen: false})}
          />
          <div className="titles">
            <NavLink to="/" className="nav-logo" >
              <img src="/img/yote_logo.png"/>
              <span className="-subtitle"> Standard Yote Dev Kit </span>
            </NavLink>
          </div>
          <div className="actions">
            <div className="yt-row center-vert right">
              <ul className="navigation">
                { MAIN_NAV_ITEMS.map((item, i) =>
                  <li key={i}>
                    <NavLink to={item.path} activeClassName="active">{item.display}</NavLink>
                  </li>
                )}
                { loggedInUser && loggedInUser._id ?
                  <li className="dropdown">
                    <a onClick={() => this.setState({profileOpen: true})}>
                      <div className="-profile-pic" style={profileImg} />
                      <i className="fa fa-caret-down"></i>
                    </a>
                    <ProfileDropdown
                      close={() => this.setState({profileOpen: false})}
                      isOpen={this.state.profileOpen}
                    />
                  </li>
                  :
                  null
                }
              </ul>
              {!loggedInUser.username ?
                <ul className="navigation">
                  <li>
                    <NavLink to="/user/login">Sign In</NavLink>
                  </li>
                  <li>
                    <NavLink to="/user/register">Register</NavLink>
                  </li>
                </ul>
                :
                null
              }
            </div>
          </div>
        </div>
      </header>
    )
  }

}

DefaultTopNav.propTypes = {
  dispatch: PropTypes.func.isRequired
  , fancyScroll: PropTypes.bool
  , fixed: PropTypes.bool
  , navClasses: PropTypes.string
}

DefaultTopNav.defaultProps = {
  fancyScroll: false
  , fixed: true
  , navClasses: ''
}

const mapStoreToProps = (store) => {
  return {
    loggedInUser: store.user.loggedIn.user
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(DefaultTopNav)
);
