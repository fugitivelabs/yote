
// import primary libraries
import React from 'react'
import { Link, useLocation, useParams, useHistory } from 'react-router-dom'

// import actions/reducer
import { useSingleProduct, useUpdateProduct } from '../productService';

// import resource components
import ProductForm from '../components/ProductForm.js.jsx';

const UpdateProduct = () => {

  const history = useHistory(); // get history object
  const { productId } = useParams(); // replaces match.params.productId

  // Fetch the single product using the query hook created in productService.
  const {
    data: product, // rename the returned data to something more descriptive
    error,
    isLoading, // isLoading is true the first time this product is fetched from the server and never again. If isLoading is true we can be sure that we haven't received a product yet.
    isFetching, // isFetching is true every time this product is fetched from the server. We'll still have access to the existing cached product while fetching occurs.
  } = useSingleProduct(productId);

  // access the update action by running the mutation hook created in productService
  // It returns an array where the first item is the update action and the second is an object with information about the result of the update action
  const [
    sendUpdateProduct, // this is the function that fires the POST call to api/products/:productId. Think of it as importing productActions.sendUpdateProduct
    { isLoading: isUpdating }, // This is the destructured mutation result. Rename isLoading to isUpdating for clarity.
  ] = useUpdateProduct();

  const handleFormSubmit = async (updatedProduct) => {
    // send the updatedProduct to the server
    const { data: product } = await sendUpdateProduct(updatedProduct); // replaces dispatch(productActions.sendUpdateProduct(updatedProduct)).then(productRes => {...})
    // back to single product view
    history.push(`/products/${product._id}`)
  }
  
  // render UI based on data and loading state
  if(error) return <div>There was an error fetching this product</div>
  if(isLoading) return <div>Loading...</div>
  if(!product) return <div>No product found</div>
  // No errors, not loading, and we have the product. Safe to render the form
  return (
    <ProductForm
      product={product}
      cancelLink="/products"
      disabled={isFetching || isUpdating}
      formTitle="Update Product"
      formType="update"
      handleFormSubmit={handleFormSubmit}
    />
  )
}

export default UpdateProduct;

