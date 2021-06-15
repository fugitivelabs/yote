
// import primary libraries
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

// import actions/reducer
import { useProductList } from '../productApi';

// import resource components
import ProductListItem from '../components/ProductListItem.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';

const ProductList = () => {
  // Using a query hook automatically fetches data and returns query values
  // const { data: productList, error, isLoading, isFetching, refetch } = useProductList(['name', 'foo']); // must pass listArgs as an array because useProductList expects the second argument to be options
  const { data: productList, error, isLoading, isFetching, refetch } = useProductList(['all']);

  // render UI based on data and loading state
  return (
    <ProductLayout>
      <h1> Product List</h1>
      <Link to={'/products/new'}> New Product</Link>
      <hr/>
      { error ? <div>{error}</div>
        : // isLoading is true the first time this list is fetched from the server and never again. isLoading is only true when there is no productList yet.
        isLoading ? <div>Loading!</div>
        :// isFetching is true every time this list is fetched from the server. isFetching is true when we have productList but are actively refetching the list.
        <div style={{opacity: isFetching ? 0.5 : 1}}>
          <ul>
          { // 'productList?.map' is equivalent to 'productList ? productList.map ... : null'
            productList?.map((product, i) =>
              <ProductListItem key={product._id + i} product={product} />
            )}
            </ul>
        </div>
      }
    </ProductLayout>
  )
}

export default ProductList;
