// import primary libraries
import React from 'react'
import { Link } from 'react-router-dom'

// import actions/reducer
import { useProductList } from '../productService';

// import resource components
import ProductListItem from '../components/ProductListItem.jsx';
import ProductLayout from '../components/ProductLayout.jsx';
import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';


const ProductList = () => {
  // fetch the product list using the query hook supplied by productService
  // it will dispatch the fetch related actions and update this return object as it goes
  const { data: productList, ...productFetch } = useProductList(['all']);
  const isEmpty = !productList || productList.length === 0;
  return (
    <ProductLayout title={'Product List'}>
      <h1> Product List</h1>
      <Link to={'/products-rtk/new'}> New Product</Link>
      <hr />
      {/* pass the fetch info along to this component to handle the loading and error states */}
      <AsyncWrapper {...productFetch}>
        {/* pass the fetch data dependent jsx as children of AsyncWrapper so they can be rendered only when the fetch is done */}
        { isEmpty ? <div>No products found</div>
          :
          <ul>
            {productList.map((product) =>
                // I've read that passing the id is more performant than passing the whole product object, but I have my doubts about that.
                <ProductListItem key={product._id} productId={product._id} listArgs={['all']} />
                // <ProductListItem key={product._id} product={product} />
                )}
          </ul>
        }
      </AsyncWrapper>
    </ProductLayout>
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
// import ProductListItem from '../components/ProductListItem.jsx';

// const ProductList = () => {

//   const { data: productIdMap, error, isLoading, isFetching } = useProductIdMap(['all']);

//   // render UI based on data and loading state
//   if(error) return <div>There was an error fetching this product. <button onClick={refetch}> Try again </button></div>
//   if(isLoading) return <div>Loading...</div>
//   if(!productIdMap) return <div>No products found</div>
//   return (
//     <>
//       <h1> Product List</h1>
//       <Link to={'/products-rtk/new'}> New Product</Link>
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
