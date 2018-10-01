// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

// import global components
import Binder from '../../../../global/Binder.js.jsx';

const AdminProductListItem = ({
  product
}) => {
  return (
    <tr >
      <td><Link to={`/admin/products/${product._id}`}>{product.title}</Link></td>
      <td>{DateTime.fromISO(product.updated).toLocaleString(DateTime.DATE_SHORT)}</td>
      <td className="u-textRight"><Link to={`/admin/products/${product._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

AdminProductListItem.defaultProps = {
}

export default withRouter(AdminProductListItem);
