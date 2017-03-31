// import primary libraries
import React, { PropTypes } from 'react'
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
