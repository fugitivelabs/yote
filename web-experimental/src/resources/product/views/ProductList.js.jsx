
// import primary libraries
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

// import actions/reducer
import { useProductList } from '../productService';

// import resource components
import ProductListItem from '../components/ProductListItem.js.jsx';

const ProductList = () => {
  // Using a query hook automatically fetches data and returns query values
  // const { data: productList, error, isLoading, isFetching, refetch } = useProductList(['status', 'draft']); // must pass listArgs as an array because useProductList expects the second argument to be options
  const {
    data: productList, // rename the returned data to something more descriptive
    error,
    isLoading, // isLoading is true the first time this list is fetched from the server and never again. If isLoading is true we can be sure that we haven't received a productList yet.
    isFetching, // isFetching is true every time this list is fetched from the server. We'll still have access to the existing cached productList while fetching occurs.
    refetch // Every method on productService returns this refetch function which will re-run the query. 
  } = useProductList(['all']);

  // render UI based on data and loading state
  if(error) return <div>There was an error fetching this product. <button onClick={refetch}> Try again </button></div>
  if(isLoading) return <div>Loading...</div>
  if(!productList || !productList.length) return <div>No products found</div>
  return (
    <>
      <h1> Product List</h1>
      <Link to={'/products/new'}> New Product</Link>
      <hr/>
      <div style={{opacity: isFetching ? 0.5 : 1}}>
        <ul>
        { productList.map((product, i) =>
            <ProductListItem key={product._id + i} product={product} />
        )}
        </ul>
      </div>
    </>
  )
}

export default ProductList;



// // Example using productIdMap fetch below

// // import primary libraries
// import React from 'react'
// import { Link } from 'react-router-dom'

// // import actions/reducer hooks
// import { useProductIdMap } from '../productService';

// // import resource components
// import ProductListItem from '../components/ProductListItem.js.jsx';

// const ProductList = () => {

//   const { data: productIdMap, error, isLoading, isFetching } = useProductIdMap(['all']);

//   // render UI based on data and loading state
//   if(error) return <div>There was an error fetching this product. <button onClick={refetch}> Try again </button></div>
//   if(isLoading) return <div>Loading...</div>
//   if(!productIdMap) return <div>No products found</div>
//   return (
//     <>
//       <h1> Product List</h1>
//       <Link to={'/products/new'}> New Product</Link>
//       <hr/>
//       <div style={{opacity: isFetching ? 0.5 : 1}}>
//         <ul>
//         { Object.keys(productIdMap).map((productId, i) =>
//             <ProductListItem key={productId + i} product={productIdMap[productId]} />
//         )}
//         </ul>
//       </div>
//     </>
//   )
// }

// export default ProductList;
