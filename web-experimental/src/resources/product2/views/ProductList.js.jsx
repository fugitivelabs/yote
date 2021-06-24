// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props
import { Link } from 'react-router-dom'

// import actions/reducer
import { useGetProductList } from '../productService';

// import global components
import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper.js.jsx';

// import resource components
import ProductListItem from '../components/ProductListItem.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';


const ProductList = () => {
  // get the list from the store (or fetch it from the server)
  const { list: productList, ...productFetch } = useGetProductList(['all']);
  const isEmpty = !productList || productList.length === 0;

  return (
    <ProductLayout title={'Product List'}>
      <h1> Product List</h1>
      {/* Could be a good pattern for list invalidation, but current just adding the new product to the 'all' list on creation */}
      {/* <Link to={'/products2/new'} onClick={productFetch.invalidate}> New Product</Link> */}
      <Link to={'/products2/new'}> New Product</Link>
      <hr />
      {/* pass the fetch info along to this component to handle the loading and error states */}
      <AsyncWrapper {...productFetch}>
        {/* pass the fetch data dependent jsx as children of AsyncWrapper so they can be rendered only when the fetch is done */}
        { isEmpty ? <div>No products found</div>
          :
          <ul>
            { productList.map((product, i) =>
              <ProductListItem key={product._id} product={product} />
            )}
          </ul>
        }
        {/* Try it out, it actually works */}
        {/* <button onClick={productFetch.invalidate}>Invalidate the fetch!</button> */}
      </AsyncWrapper>
    </ProductLayout>
  )
}

export default ProductList;