
// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props!
import { Link, useLocation, useParams } from 'react-router-dom'

// import actions/reducer
import { useSingleProduct, useProductList } from '../productService';

// import global components
// import Breadcrumbs from '../../../global/components/navigation/Breadcrumbs.js.jsx'; // doesn't exist yet

const SingleProduct = () => {
  // get the product id from the url. Below is equivalent to const { productId } = this.props.match.params;
  const { productId } = useParams();
  // get location. Below is equivalent to const location = this.props.location;
  const location = useLocation();
  
  // Will select the product with the given id from the existing list (or will fetch the list) and will only rerender if the given product's data changes
  // Not really useful in this context, but could become useful.
  // This actually works pretty well for singles as it doesn't make a fetch when you click through from productList to this view. Could be interesting.
  // more info: https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options
  // const { product, error, isLoading, isFetching } = useProductList(['all'], {
  //   selectFromResult: ({ data }) => ({
  //     product: data?.find((product) => product._id === productId),
  //   }),
  // });

  // Fetch the single product using the hook created in productService.
  const {
    data: product, // rename the returned data to something more descriptive
    error,
    isLoading, // isLoading is true the first time this product is fetched from the server and never again. If isLoading is true we can be sure that we haven't received a product yet.
    isFetching, // isFetching is true every time this product is fetched from the server. We'll still have access to the existing cached product while fetching occurs.
    refetch // Every method on productService returns this refetch function which will re-run the query. 
  } = useSingleProduct(productId);
  
  // render UI based on data and loading state
  if(error) return <div>There was an error fetching this product. <button onClick={refetch}> Try again </button></div>
  if(isLoading) return <div>Loading...</div>
  if(!product) return <div>No product found</div>
  // No errors, not loading, and we have the product. Safe to render the product info
  return (
    <>
      <h3> Single Product </h3>
      <hr/>
      <div style={{opacity: isFetching ? 0.5 : 1}}>
        <h1> {product.title} </h1>
        <hr/>
        <p> {product.description}</p>
        <Link to={`${location.pathname}/update`}> UPDATE PRODUCT </Link>
      </div>
    </>
  )
}

export default SingleProduct;

