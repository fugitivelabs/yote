/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

class UserLayout extends Base {
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
