import React from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Link } from 'react-router';
import classNames from 'classnames';

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
    let headerClass = classNames(
      'header'
      // , 'fixed'

    )

    return(
      <header className={headerClass}>
        <div className="topbar yt-container">
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
