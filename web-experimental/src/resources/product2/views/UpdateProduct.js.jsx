// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props
import { useParams, useHistory } from 'react-router-dom'

// import actions/reducer
import { useGetUpdatableProduct } from '../productService';

// import global components
import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';

// import resource components
import ProductLayout from '../components/ProductLayout.js.jsx'
import ProductForm from '../components/ProductForm.js.jsx';


const UpdateProduct = () => {
  const history = useHistory(); // get history object
  const { productId } = useParams(); // replaces match.params.productId

  // fetches and returns the product and the update action wrapped in dispatch.
  // another benefit of using this version is that productFetch.isFetching will be true while the update is being processed by the server.
  const { sendUpdateProduct, item: product, ...productFetch } = useGetUpdatableProduct(productId);

  const handleFormSubmit = async (updatedProduct) => {
    // send the updatedProduct to the server
    sendUpdateProduct(updatedProduct);
    // back to single product view
    history.push(`/products2/${product._id}`)
  }
  
  return (
    <ProductLayout title={'Update Product'}>
      <AsyncWrapper {...productFetch}>
        { !product ? <div>No product found</div>
          : // we have the product, render the form
          <ProductForm
            product={product}
            cancelLink={`/products2/${productId}`}
            disabled={productFetch.isFetching}
            formTitle="Update Product"
            formType="update"
            handleFormSubmit={handleFormSubmit}
          />
        }
      </AsyncWrapper>
    </ProductLayout>
  )
}

export default UpdateProduct;


