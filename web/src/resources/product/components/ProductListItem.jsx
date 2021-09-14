

  // import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import global components
import ListItem from '../../../global/components/base/ListItem';
import Button from '../../../global/components/base/Button';
// import WaitOn from '../../../global/components/helpers/WaitOn';

// import services
import { useGetProductById } from '../productService';

const ProductListItem = ({ id }) => {
  const { data: product, ...productQuery } = useGetProductById(id);

  if(productQuery.isLoading) return <Skeleton />
  if(productQuery.isError) return <ListItem>An error occurred 😬 <Button onClick={productQuery.refetch}>Refetch</Button></ListItem>
  if(!product) return <ListItem>No product found</ListItem>

  return (
    <ListItem className={productQuery.isFetching ? 'opacity-50' : ''}>
      <Link to={`/products/${product._id}`}>{product.title}</Link>
      <p><em>{product.description}</em></p>
    </ListItem>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <ListItem className="animate-pulse">
      <p className="w-6/12 h-4 bg-gray-500"></p>
      <p className="h-4"></p>
      <p className="w-8/12 h-4 bg-gray-500"></p>
    </ListItem>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductListItem;