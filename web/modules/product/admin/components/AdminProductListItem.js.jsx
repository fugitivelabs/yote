// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

// import global components
import Base from '../../../../global/BaseComponent.js.jsx';

const AdminProductListItem = ({
  product
}) => {
  return (
    <tr >
      <td className="_40"><Link to={`/admin/products/${product._id}`}>{product.title}</Link></td>
      <td className="_20">{DateTime.fromISO(product.updated).toLocaleString(DateTime.DATE_SHORT)}</td>
      <td className="-right"><Link to={`/admin/products/${product._id}`}>View</Link> <Link to={`/admin/products/${product._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

AdminProductListItem.defaultProps = {
}

export default withRouter(AdminProductListItem);
