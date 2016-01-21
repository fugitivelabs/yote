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
            <Link to="/posts" activeClassName="active">Posts</Link>
          </li>
        </ul>
      </div>
    )
  }

}
