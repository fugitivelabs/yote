import React from 'react';
import Base from './BaseComponent.js.jsx';
import { Router, Route, Link } from 'react-router';

export default class SideNav extends Base {
  constructor(props, context) {
    super(props);
  }

  render() {
    return(
      <div className="sidebar">
        <ul className="side-nav">
          <li>
            <Link to="/studies" activeClassName="active">Studies</Link>
          </li>
          <li>
            <Link to="/sites" activeClassName="active" >Sites</Link>
          </li>
          <li>
            <Link to="/sponsors" activeClassName="active" >Sponsors</Link>
          </li>

        </ul>
      </div>
    )
  }

}
