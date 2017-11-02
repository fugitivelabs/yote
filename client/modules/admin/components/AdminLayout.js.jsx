/**
 * Wrap all admin children in this special admin layout
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import admin components
import AdminSideNav from './AdminSideNav.js.jsx';

export default class AdminLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout admin">
        <div className="admin-layout">
          <AdminSideNav />
          <div className="admin-main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
