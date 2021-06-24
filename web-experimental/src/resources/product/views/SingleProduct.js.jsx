// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props!
import { Link, useLocation, useParams } from 'react-router-dom'

// import actions/reducer
import {
  useSingleProduct,
  // useProductList
} from '../productService';

// import global components
import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper.js.jsx';
// import Breadcrumbs from '../../../global/components/navigation/Breadcrumbs.js.jsx'; // doesn't exist yet

import ProductLayout from '../components/ProductLayout.js.jsx'

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
  const { data: product, ...productFetch } = useSingleProduct(productId);
  const isEmpty = !product;
  return (
    <ProductLayout title={'Single Product'}>
      <h3> Single Product </h3>
      <hr />
      <AsyncWrapper {...productFetch}>
        { isEmpty ?
          <div>No product found</div>
          :
          <>
            <h1> {product.title} </h1>
            <hr />
            <p> {product.description}</p>
            <Link to={`${location.pathname}/update`}> UPDATE PRODUCT </Link>
          </>
        }
      </AsyncWrapper>
    </ProductLayout>
  )
}

export default SingleProduct;
