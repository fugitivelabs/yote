// import primary libraries
import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import product css modules
import productStyles from '../productModuleStyles.css';


function ProductListItem({ product }) {
  return (
    <li styleName="list-item">
      <Link to={`/products/${product._id}`}> {product.title}</Link>
      <p><em>{product.description}</em></p>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;
