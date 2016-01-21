import React from 'react';
import Base from './BaseComponent.js.jsx';

import SideNav from './SideNav.js.jsx';

export default class Layout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex main">
        <SideNav /> 
        {this.props.children}
      </div>
    )
  }
}
