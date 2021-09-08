// import primary libraries
import React from 'react'
import { useHistory } from 'react-router-dom'

// import actions/reducer
import { useDefaultProduct, useCreateProduct } from '../productService';

// import resource components
import ProductForm from '../components/ProductForm.jsx';
import ProductLayout from '../components/ProductLayout.jsx';


const CreateProduct = () => {
  const history = useHistory();
  
  const { data: defaultProduct, error, isLoading, isFetching } = useDefaultProduct();

  // access the create action by running the mutation hook created in productService
  // It returns an array where the first item is the create action and the second is an object with information about the result of the create action
  const [
    sendCreateProduct, // this is the function that fires the POST call to api/products/:productId
    { isLoading: isCreating }, // This is the destructured mutation result.  Rename isLoading to isCreating for clarity.
  ] = useCreateProduct();

  const handleFormSubmit = async (newProduct) => {
    const { data: product } = await sendCreateProduct(newProduct); //  replaces dispatch(productActions.sendCreateProduct(newProduct)).then(productRes => ...)
    history.push(`/products/${product._id}`)
  }

  // render UI based on data and loading state
  // without AsyncWrapper we have to check each possible state by hand
  return (
    <ProductLayout title={'New Product'}>
      { error ? <div>{error}</div>
        : isLoading ? <div>Loading...</div>
        : !defaultProduct ? <div>No default product found!</div>
        : // we have the defaultProduct, render the form
        <ProductForm
          product={defaultProduct}
          cancelLink="/products"
          disabled={isFetching || isCreating}
          formTitle="Create Product"
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
      }
    </ProductLayout>
  )
}

export default CreateProduct;


