// import primary libraries
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductForm from '../components/ProductForm.jsx';
import ProductLayout from '../components/ProductLayout.jsx';

// import services
import { useCreateProduct } from '../productService';

const CreateProduct = () => {
  const history = useHistory();
  const { data: defaultProduct, sendCreateProduct, ...defaultProductQuery } = useCreateProduct();

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false);

  const handleFormSubmit = async (newProduct) => {
    // set isCreating true to disable the form while wait for the new product to get returned
    setIsCreating(true);
    const { payload: product, error } = await sendCreateProduct(newProduct); // replaces dispatch(productActions.sendCreateProduct(newProduct)).then(productRes => ...)
    setIsCreating(false);
    if(error) {
      alert(error.message || 'An error occurred.');
      history.push(`/products`);
    } else {
      history.push(`/products/${product._id}`);
    }
  }

  // render UI based on data and loading state
  return (
    <ProductLayout title={'New Product'}>
      <WaitOn query={defaultProductQuery}>
      { defaultProduct &&
        // we have the defaultProduct, render the form
        <ProductForm
          product={defaultProduct}
          cancelLink="/products"
          disabled={defaultProductQuery.isFetching || isCreating}
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
      }
      </WaitOn>
    </ProductLayout>
  )
}

export default CreateProduct;


