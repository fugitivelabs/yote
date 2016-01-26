import React from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Router, Route, Link } from 'react-router';

class DropdownMenu extends Base {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.isOpen) {
      return(
        <ul className="dropMenu"> 
          <li className="dropdown-header"> Hello,  </li>
          <li><Link onClick={this.props._openDropdown} to="/posts"> Posts</Link></li>
          <li><a href="#"> Admin </a></li>
          <li role="separator" className="divider"><br/></li>
          <li><a href="#">Logout</a></li>
        </ul>
      )
    } else {
      return null;
    }
  }
}


export default class TopNav extends Base {
  constructor(props, context) {
    super(props);
    this.state = this.getState();
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
    );
  }

  getState() {
    return {
      isOpen: false
    }
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
              <Link to="/posts" activeClassName="active">Posts</Link>
            </li>
            <li>
              <Link to="/posts" activeClassName="active">Posts</Link>
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
