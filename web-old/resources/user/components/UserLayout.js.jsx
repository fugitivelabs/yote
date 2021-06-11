/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

class UserLayout extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout">
        <div className="body with-header -gray">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default UserLayout;
