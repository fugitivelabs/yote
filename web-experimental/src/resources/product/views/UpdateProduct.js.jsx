
// import primary libraries
import React from 'react'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'

// import actions/reducer
import { useProductByIdQuery, useUpdateProduct } from '../productApi';

// import resource components
import ProductForm from '../components/ProductForm.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';

const UpdateProduct = () => {

  const history = useHistory(); // get history object
  const { productId } = useParams(); // replaces match.params.productId

  // fetch product (or get it from the cache);
  const { data: product, error, isLoading, isFetching } = useProductByIdQuery(productId); // replaces dispatch(productActions.fetchSingleIfNeeded(productId))

  // init update action
  const [
    sendUpdateProduct, // this is the function that fires the POST call to api/products/:productId. think productActions.fetchSendUpdateProduct
    { isUpdating }, // This is the destructured mutation result
  ] = useUpdateProduct();

  const handleFormSubmit = (updatedProduct) => {
    sendUpdateProduct(updatedProduct);
    // back to single product view
    history.push(`/products/${productId}`)
  }

  // render UI based on data and loading state
  return (
    <ProductLayout>
      { error ?
        <div>{error}</div>
        :
        isLoading ?
        <h2>Loading...</h2>
        :
        product ?
        <ProductForm
          product={product}
          cancelLink="/products"
          disabled={isFetching || isUpdating}
          formTitle="Update Product"
          formType="update"
          handleFormSubmit={handleFormSubmit}
        />
        :
        null
      }
    </ProductLayout>
  )
}

export default UpdateProduct;

