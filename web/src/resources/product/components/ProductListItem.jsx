

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import global components

// import services
import { useProductFromMap } from '../productService';

const ProductListItem = ({ id }) => {
  const product = useProductFromMap(id);

  if(!product) return <Skeleton />;
  return (
    <li>
      <Link to={`/products/${product?._id}`}>{product?.title}</Link>
      <p>{product?.description}</p>
    </li>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <li className="animate-pulse">
      <p>...</p>
    </li>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductListItem;