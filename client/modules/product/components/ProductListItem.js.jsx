// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function ProductListItem({ product }) {
  return (
    <li>
      <Link to={`/products/${product._id}`}> {product.title}</Link>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;
