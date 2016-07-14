/**

The navbar on the landing page is styled a little differently

**/

import React from 'react';
import Base from '../../../../global/components/BaseComponent.js.jsx';
import { Link } from 'react-router';

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

    return (
      <div style={background} className="topbar landing-nav _fixed transparent">
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
          <ul className="top-nav">
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
    )
  }
}

Navbar.propTypes = {
  isScrolled: React.PropTypes.bool
  , openDialog: React.PropTypes.func

}

export default Navbar;
