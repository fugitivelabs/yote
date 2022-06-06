/**
 * View component for /products/new
 *
 * Creates a new product from a copy of the defaultItem in the product store
 */

// import primary libraries
import React from 'react'
import { useHistory } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'

// import resource components
import ProductForm from '../components/ProductForm.jsx'
import ProductLayout from '../components/ProductLayout.jsx'

// import services
import { useCreateProduct } from '../productService'

const CreateProduct = () => {
  const history = useHistory()

  const { data: product, handleFormChange, handleFormSubmit, ...productQuery } = useCreateProduct({
    // optional, anything we want to add to the default object
    initialState: {
      // someKey: someValue
    }
    // optional, callback function to run after the request is complete
    , onResponse: (newProduct, error) => {
      if(error || !newProduct) {
        alert(error?.message || 'An error occurred.')
        history.push('/products')
      } else {
        history.push(`/products/${newProduct._id}`)
      }
    }
  });

  // render UI based on data and loading state
  return (
    <ProductLayout title={'New Product'}>
      <WaitOn query={productQuery}>
        <ProductForm
          product={product}
          cancelLink='/products'
          disabled={productQuery.isFetching}
          formType='create'
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </ProductLayout>
  )
}

export default CreateProduct
