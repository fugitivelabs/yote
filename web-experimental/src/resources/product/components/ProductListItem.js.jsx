// // import primary libraries
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// const ProductListItem = ({ product }) => {
//   return (
//     <li>
//       <Link to={`/products/${product._id}`}> {product.title}</Link>
//       <p><em>{product.description}</em></p>
//     </li>
//   )
// }

// ProductListItem.propTypes = {
//   product: PropTypes.object.isRequired
// }

// export default ProductListItem;

  // import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import actions/reducer
import { useProductFromList } from '../productService';

// const ProductListItem = ({ product }) => {
const ProductListItem = ({ productId, listArgs }) => {

  // if we just passed the id we can use this helper method to grab the product from the list.
  // seems like it would be more efficient to just pass the whole product from the parent, but here's how it could work
  const { product } = useProductFromList(productId, listArgs);

  return (
    <li>
      <Link to={`/products/${product?._id}`}> {product?.title}</Link>
      <p><em>{product?.description}</em></p>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListItem;