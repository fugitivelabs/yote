// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props
import { useParams, useHistory } from 'react-router-dom'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductLayout from '../components/ProductLayout.jsx'
import ProductForm from '../components/ProductForm.jsx';

// import services
import { useGetUpdatableProduct } from '../productService';

const UpdateProduct = () => {
  const history = useHistory(); // get history object
  const { productId } = useParams(); // replaces match.params.productId

  // fetches and returns the product and the update action wrapped in dispatch.
  // another benefit of using this version is that productQuery.isFetching will be true while the update is being processed by the server.
  const { sendUpdateProduct, data: product, ...productQuery } = useGetUpdatableProduct(productId);

  const handleFormSubmit = updatedProduct => {
    // send the updatedProduct to the server
    sendUpdateProduct(updatedProduct);
    // back to single product view. We don't have to wait for the update to finish. It's okay if the product is still updating when the user gets to the single product view.
    history.push(`/products/${updatedProduct._id}`);
  }

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
    //       handleFormSubmit={handleFormSubmit}
    //     />
    //   }
    // </ProductLayout>

    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <ProductLayout title={'Update Product'}>
      <WaitOn query={productQuery}>
        { product &&
          // we have the product, render the form
          <ProductForm
            product={product}
            cancelLink={`/products/${productId}`}
            disabled={productQuery.isFetching}
            formType="update"
            handleFormSubmit={handleFormSubmit}
          />
        }
      </WaitOn>
    </ProductLayout>
  )
}

export default UpdateProduct;


