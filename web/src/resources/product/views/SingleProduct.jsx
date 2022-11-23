// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props
import { Link, useLocation, useParams } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import services
// import { useGetProductById } from '../productService';
import { useGetUpdatableProduct } from '../productService';

// import resource components
import ProductLayout from '../components/ProductLayout.jsx'
import { CheckboxInput } from '../../../global/components/forms';
import { useEffect } from 'react';

const SingleProduct = () => {
  // get location. Below is equivalent to const location = this.props.location;
  const location = useLocation();

  // get the product id from the url. Below is equivalent to const { productId } = this.props.match.params;
  const { productId } = useParams();

  // get the product from the store (or fetch it from the server)
  // const { data: product, ...productQuery } = useGetProductById(productId);
  // as example of how we can update the product without using the standard form, use the hook to get the product and the stuff needed to update it.
  const { data: product, handleChange, handleSubmit, isChanged, setFormState, resetFormState, ...productQuery } = useGetUpdatableProduct(productId);
  // if you need information stored on `product` to perform other fetches use the examples below
  // NOTE: if any listArg value (`category` in this case) is undefined then the hook will wait to perform the fetch
  // const { data: relatedProducts, ...relatedProductsQuery } = useGetProductList({ category: product?.category })
  // NOTE: if the id is undefined then the hook will wait to perform the fetch
  // const { data: otherResource, ...otherResourceQuery } = useGetOtherResourceById(product?._otherResource);

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
          <CheckboxInput // clicking the checkbox will change the product in the store using the handleChange function
            label='Featured'
            name='featured'
            value={product?.featured}
            disabled={!product}
            change={handleChange}
          />
          {isChanged && ( // if the product has been changed then show the save button, clicking it will dispatch the update action and save the product to the server
            <div>
              <button disabled={productQuery.isFetching} onClick={resetFormState}>Cancel</button>
              <button disabled={productQuery.isFetching} onClick={handleSubmit}>Save</button>
            </div>
          )}
        </div>
        <Link to={`${location.pathname}/update`}>Update Product</Link>
      </WaitOn>
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
