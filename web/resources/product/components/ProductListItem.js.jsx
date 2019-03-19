// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return (
    <li>
      <Link to={`/products/${product.id}`}> {product.title}</Link>
      <p><em>{product.description}</em></p>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;
