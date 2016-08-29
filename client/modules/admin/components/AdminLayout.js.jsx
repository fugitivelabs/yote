// import React from 'react';
import React, { PropTypes } from 'react';
// import Base from './BaseComponent.js.jsx';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux';

import SideNav from './SideNav.js.jsx';

export default class AdminLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout admin">
        <div className="admin-layout">
          <SideNav />
          <div className="admin-main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

// AdminLayout.propTypes = {
//   dispatch: PropTypes.func.isRequired
// }
