/**
 * Wrap all admin children in this special admin layout
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import admin components
import AdminTopNav from './AdminTopNav.js.jsx';

export default class AdminLayout extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="master-layout admin-layout">
        <AdminTopNav/>
        <div className="body with-header -admin-body">
          <div className="yt-container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
