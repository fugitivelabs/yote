// import primary libraries
import React, { useEffect, useState } from 'react'
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
  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setProduct] = useState({});
  const { data: defaultProduct, sendCreateProduct, ...defaultProductQuery } = useCreateProduct();

  useEffect(() => {
    // once we have the default product, set it to state
    if(defaultProduct) {
      setProduct(defaultProduct);
    }
  }, [defaultProduct])

  // setProduct will replace the entire product object with the new product object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    // both ways below accomplish the same thing.
    setProduct({ ...newProduct, [e.target.name]: e.target.value });
    // if we didn't have direct access to `newProduct` we could use this where we can access product as the current state
    // setProduct(currentProductState => {
    //   return { ...currentProductState, [e.target.name]: e.target.value }
    // });

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        <ProductForm
          product={newProduct}
          cancelLink="/products"
          disabled={defaultProductQuery.isFetching || isCreating}
          formType="create"
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </ProductLayout>
  )
}

export default CreateProduct;


