

  // import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItem from '../../../global/components/base/ListItem';

// import { useProductFromMap } from '../productService';

// const ProductListItem = ({ productId }) => {
const ProductListItem = ({ product }) => {
  // here's how we could use the productId to pull a product from the product store byId map.
  // const product = useProductFromMap(productId);
  return (
    <ListItem>
      <Link to={`/products2/${product._id}`}>{product.title}</Link>
      <p><em>{product.description}</em></p>
    </ListItem>

  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;