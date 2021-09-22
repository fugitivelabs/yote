// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props
import { Link, useLocation, useParams } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import services
import { useGetProductById } from '../productService';

// import resource components
import ProductLayout from '../components/ProductLayout.jsx'

const SingleProduct = () => {
  // get location. Below is equivalent to const location = this.props.location;
  const location = useLocation();

  // get the product id from the url. Below is equivalent to const { productId } = this.props.match.params;
  const { productId } = useParams();

  // get the product from the store (or fetch it from the server)
  const { data: product, ...productQuery } = useGetProductById(productId);

  return (
    // <ProductLayout title={'Single Product'}>
    // { productQuery.isLoading ? <Skeleton />
    //   : productQuery.isError ? <div>An error occurred 😬 <button onClick={productQuery.refetch}>Refetch</button></div>
    //   : productQuery.isEmpty ? <div>Empty</div>
    //   :
    //   <div className={productQuery.isFetching ? 'opacity-50' : ''}>
    //     <h1> {product?.title} </h1>
    //     <p> {product?.description}</p>
    //     <Link to={`${location.pathname}/update`}>Update Product</Link>
    //   </div>
    // }
    // </ProductLayout>
    <ProductLayout title={'Single Product'}>
      <WaitOn query={productQuery} fallback={<Skeleton />}>
        <div className={productQuery.isFetching ? 'opacity-50' : ''}>
          <h2>Product details</h2>
          <h1> {product?.title} </h1>
          <p> {product?.description} </p>
        </div>
      </WaitOn>
      <Link to={`${location.pathname}/update`}>Update Product</Link>
    </ProductLayout>
  )
}

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <p className="w-48 h-5 bg-gray-400"/>
      <p className="h-1"/>
      <p className="w-64 h-5 bg-gray-400" />
      <p className="h-1"/>
    </div>
  )
}

export default SingleProduct;
