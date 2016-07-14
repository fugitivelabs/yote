import React from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Link } from 'react-router';

import DropdownMenu from './DropdownMenu.js.jsx';

export default class TopNav extends Base {
  constructor(props, context) {
    super(props);
    this.state = {
      isOpen: false
    }
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
    );
  }

  // getState() {
  //   return {
  //     isOpen: false
  //   }
  // }

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
    return(
      <div className="topbar">
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
              <Link to="/posts" activeClassName="active">Posts 2<sup> complex</sup></Link>
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
