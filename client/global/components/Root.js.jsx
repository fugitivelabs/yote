/**
 * Wraps the entire route-stack.  Would be useful for an app with some redirect
 * logic or something. 99% of the time, it will probably remain unchanged.
 */

// import primary libraries
import React from 'react';

// import components 
import Base from './BaseComponent.js.jsx';

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
