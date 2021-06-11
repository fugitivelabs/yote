/**
 * Living style-guide for this Yote application
 *
 * TODO:  This needs a lot of work
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import admin components
import AdminLayout from '../components/AdminLayout.js.jsx';

import { ADMIN_NAV_ITEMS } from '../../../config/adminNavItems.js';

class AdminDashboard extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return  (
      <AdminLayout>
        <h3> Admin Dashboard </h3>
        <hr/>
        Admin modules
        <ul>
          { ADMIN_NAV_ITEMS.map((item, i) =>
            <li key={i}>
              <Link to={item.path}>{item.display}</Link>
            </li>
          )}
        </ul>
      </AdminLayout>
    )
  }
}

export default AdminDashboard;
