/**

The navbar on the landing page is styled a little differently

**/

import React from 'react';
import Base from '../../../../global/components/BaseComponent.js.jsx';
import { Link } from 'react-router';
import classNames from 'classnames';

import CloseWrapper from '../../../../global/components/helpers/CloseWrapper.js.jsx';
import DropdownMenu from '../../../../global/components/DropdownMenu.js.jsx';

class Navbar extends Base {
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
                  <Link to="/products" activeClassName="active">Products <sup>simple</sup></Link>
                </li>
                <li>
                  <Link to="/posts" activeClassName="active">Posts <sup> complex</sup></Link>
                </li>

                <li className="dropdown">
                  <a onClick={this._openDropdown}> <i className="fa fa-caret-down"></i></a>
                </li>
                <DropdownMenu
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

Navbar.propTypes = {
  isScrolled: React.PropTypes.bool
  , openDialog: React.PropTypes.func

}

export default Navbar;
