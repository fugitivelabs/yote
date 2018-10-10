/**
 * Wraps all Product views in a wrapping containter. If you want to give all
 * product views a sidebar for example, you would set that here.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Base from '../../../../global/BaseComponent.js.jsx';
import AdminLayout from '../../../admin/components/AdminLayout.js.jsx';

class AdminUserLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminLayout>
        {this.props.children}
      </AdminLayout>
    )
  }
}

export default AdminUserLayout;
