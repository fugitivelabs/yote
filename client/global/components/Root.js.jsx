// import React from 'react';
import React from 'react';
import Base from './BaseComponent.js.jsx';

import TopNav from './TopNav.js.jsx';

export default class Root extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
