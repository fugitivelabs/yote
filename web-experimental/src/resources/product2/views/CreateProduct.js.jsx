
// import primary libraries
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// import actions/reducer
import { useCreateProduct, useAddProductToList } from '../productService';

// import global components
import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';

// import resource components
import ProductForm from '../components/ProductForm.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';

const CreateProduct = () => {
  const history = useHistory();
  const { item: defaultProduct, sendCreateProduct, ...productFetch } = useCreateProduct();
  const { addProductToList } = useAddProductToList();

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false);

  const handleFormSubmit = async (newProduct) => {
    // set isCreating true to disable the form while wait for the new product to get returned
    setIsCreating(true);
    const { payload: { product } } = await sendCreateProduct(newProduct); // replaces dispatch(productActions.sendCreateProduct(newProduct)).then(productRes => ...)
    setIsCreating(false);
    addProductToList(product._id, ['all'])
    history.push(`/products2/${product._id}`)
  }

  // render UI based on data and loading state
  return (
    <ProductLayout title={'New Product'}>
      <AsyncWrapper {...productFetch}>
      { !defaultProduct ? <div>No default product found!</div>
        : // we have the defaultProduct, render the form
        <ProductForm
          product={defaultProduct}
          cancelLink="/products2"
          disabled={productFetch.isFetching || isCreating}
          formTitle="Create Product"
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
      }
      </AsyncWrapper>
    </ProductLayout>
  )
}

export default CreateProduct;


