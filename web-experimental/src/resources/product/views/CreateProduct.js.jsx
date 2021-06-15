
// import primary libraries
import React from 'react'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'

// import actions/reducer
import { useDefaultProduct, useCreateProduct } from '../productApi';

// import resource components
import ProductForm from '../components/ProductForm.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';


const CreateProduct = () => {
  // Using a query hook automatically fetches data and returns query values
  // const { data: productList, error, isLoading, isFetching, refetch } = useProductList('all')
  const history = useHistory();
  
  const { data: defaultProduct, error, isLoading, isFetching } = useDefaultProduct(); 

  const [
    sendCreateProduct, // this is the function that fires the POST call to api/products/:productId
    { isUpdating }, // This is the destructured mutation result
  ] = useCreateProduct();

  const handleFormSubmit = async (newProduct) => {
    const {data: product} = await sendCreateProduct(newProduct);
    history.push(`/products/${product._id}`)
  }

  // render UI based on data and loading state
  return (
    <ProductLayout>
      { error ?
        <div>{error}</div>
        :
        isLoading ?
        <h2> Loading...</h2>
        :
        defaultProduct ?
        <ProductForm
          product={defaultProduct}
          cancelLink="/products"
          disabled={isFetching || isUpdating}
          formTitle="Create Product"
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
        :
        null
      }
    </ProductLayout>
  )
}

export default CreateProduct;

