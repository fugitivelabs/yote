

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
    <li className='list-none p-2 block'>
      <Link to={`/products/${product?._id}`}>{product?.title}</Link>
      <p>{product?.description}</p>
    </li>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <li className="animate-pulse list-none p-2 block">
      <p className='bg-gray-600 h-4 w-48 mt-1'></p>
      <p className='bg-gray-400 h-4 w-56 mt-1'></p>
    </li>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductListItem;