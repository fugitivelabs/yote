// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import product css modules
import productStyles from '../productModuleStyles.css';


function ProductListItem({ product }) {
  return (
    <li styleName="list-item">
      <Link className="product-title" to={`/products/${product._id}`}> {product.title}</Link>
      <p><em>{product.description}</em></p>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;
