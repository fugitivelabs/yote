
// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams } from 'react-router-dom'

// import actions/reducer
import { useProductByIdQuery } from '../productApi';

// import global components
// import Breadcrumbs from '../../../global/components/navigation/Breadcrumbs.js.jsx'; // doesn't exist yet

// import product components
import ProductLayout from '../components/ProductLayout.js.jsx';


const SingleProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  
  // Will select the product with the given id from the existing list (or will fetch the list) and will only rerender if the given product's data changes
  // Not really useful in this context, but could become useful.
  // more info: https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options
  // const { product, error, isLoading, isFetching } = useProductList('all', {
  //   selectFromResult: ({ data }) => ({
  //     product: data?.find((product) => product._id === productId),
  //   }),
  // });

  // Using a query hook automatically fetches data and returns query values
  const { data: product, error, isLoading } = useProductByIdQuery(productId);
    // render UI based on data and loading state
    
  return (
    <ProductLayout>
      <h3> Single Product </h3>
      <hr/>
      { error ? <div>{error}</div>
        :
        isLoading ? <div>Loading...</div>
        :
        <div>
          <h1> {product.title} </h1>
          <hr/>
          <p> {product.description}</p>
          <Link to={`${location.pathname}/update`}> UPDATE PRODUCT </Link>
        </div>
      }
    </ProductLayout>
  )
}

export default SingleProduct;

