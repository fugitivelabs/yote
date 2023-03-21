/**
 * View component for /products/:productId/update
 *
 * Updates a single product from a copy of the product from the product store
 */

// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types'; // this component gets no props
import { useParams, useHistory, useLocation } from 'react-router-dom';

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductLayout from '../components/ProductLayout.jsx';
import ProductForm from '../components/ProductForm.jsx';

// import services
import { useGetUpdatableProduct } from '../productService';

const UpdateProduct = () => {
  const history = useHistory();
  const location = useLocation();
  const { productId } = useParams() // replaces match.params.productId
  const { data: product, handleChange, handleSubmit, ...productQuery } = useGetUpdatableProduct(productId, {
    // optional, callback function to run after the request is complete
    onResponse: (updatedProduct, error) => {
      if(error || !updatedProduct) {
        alert(error?.message || 'An error occurred.');
      }
      history.replace(`/products/${productId}`, location.state)
    }
  });

  // render UI based on data and loading state
  return (
    // <ProductLayout title={'Update Product'}>
    //   { productQuery.isLoading ? <div>Loading...</div>
    //     : productQuery.isError ? <div>An error occurred 😬 <button onClick={productQuery.refetch}>Refetch</button></div>
    //     : productQuery.isEmpty ? <div>Empty</div>
    //     : // we have the product
    //     <ProductForm
    //       product={product}
    //       cancelLink={`/products/${productId}`}
    //       disabled={productQuery.isFetching}
    //       formTitle="Update Product"
    //       formType="update"
    //       handleSubmit={handleSubmit}
    //     />
    //   }
    // </ProductLayout>

    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <ProductLayout title={'Update Product'}>
      <WaitOn query={productQuery}>
        <ProductForm
          product={product}
          cancelLink={`/products/${productId}`}
          disabled={productQuery.isFetching}
          formType='update'
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </WaitOn>
    </ProductLayout>
  )
}

export default UpdateProduct;


