// import React from 'react';
import React, { PropTypes } from 'react';
import Base from './BaseComponent.js.jsx';

import TopNav from './TopNav.js.jsx';

export default class Layout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex layout">
        <header className="header">
          <TopNav />
        </header>
        <div className="body with-header">
          <div className="main">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
