import React from 'react';
import Base from './BaseComponent.js.jsx';
import { Link } from 'react-router';

export default class SideNav extends Base {
  constructor(props, context) {
    super(props);
  }

  render() {
    return(
      <div className="sidebar">
        <ul className="side-nav">
          <li>
            <Link to="/producs" activeClassName="active">Products</Link>
          </li>
        </ul>
      </div>
    )
  }

}
