/**
 * The navbar on the landing page is styled a little differently
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// import third-party libraries
import classNames from 'classnames';

// import global components
import Base from '../../../../global/components/BaseComponent.js.jsx';
import CloseWrapper from '../../../../global/components/helpers/CloseWrapper.js.jsx';
import DropdownNav from '../../../../global/components/navigation/DropdownNav.js.jsx';

class LandingNav extends Base {
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
    let isScrolled = this.props.isScrolled;
    if(isScrolled) {
      var background = {
        color: "rgba(0,0,0,0.6)"
        , backgroundColor: "#fff"
        , borderBottom: "1px solid rgba(0,0,0,0.15) " };
      var recStyle = {
        color: "#ff4081"
      }
    } else {
      var background = {
        color: "rgba(0,0,0,0.97)"
        , backgroundColor: "transparent" };
    }

    let headerClass = classNames(
      'header'
      // , 'fixed'
    )

    return (
      <header className={headerClass} style={background}>
        <div  className="topbar landing-nav yt-container">
          <CloseWrapper
            isOpen={this.state.isOpen}
            closeAction={this._closeDropdown}
          />
          <div className="titles">
            <Link to="/">
              <div className="nav-logo"> Yote
                <span className="subtitle"> Standard Dev Kit </span>
              </div>
            </Link>
          </div>
          <div className="actions">
            <div className="yt-row center-vert right">
              <ul className="navigation">
                <li>
                  <Link to="/products" activeClassName="active">Products</Link>
                </li>
                <li className="dropdown">
                  <a onClick={this._openDropdown}> <i className="fa fa-caret-down"></i></a>
                </li>
                <DropdownNav
                  currentUser={null}
                  isOpen={this.state.isOpen}
                />
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

LandingNav.propTypes = {
  isScrolled: PropTypes.bool
  , openDialog: PropTypes.func

}

export default LandingNav;
