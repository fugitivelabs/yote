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
import { AsyncWrapper } from '../../../global/components/navigation/helpers/AsyncWrapper.js.jsx';

// import actions/reducer
import { useProductList } from '../productService';
// import { useProductFromList } from '../productHooks';
import { useProductFromList } from '../productService';

const ProductListItem = ({ productId, listArgs }) => {
  // const ProductListItem = ({ product }) => {

  

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