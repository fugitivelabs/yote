// // import primary libraries
// import React from 'react'
// // import PropTypes from 'prop-types'; // this component gets no props

// // import actions/reducer
// import { useGetProductList } from '../productService';

// // import global components
// import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';
// import List from '../../../global/components/base/List';
// import Button from '../../../global/components/base/Button';

// // import resource components
// import ProductListItem from '../components/ProductListItem.js.jsx';
// import ProductLayout from '../components/ProductLayout.js.jsx';
// import { usePagination } from '../../../global/utils/customHooks';

// const ProductList = () => {
//   // get the list from the store (or fetch it from the server)
//   // const {pagination, setPage, setPer} = usePagination();
//   const { pagination, setPage, setPer } = usePagination({ page: 1, per: 10 });
  
//   const { products, totalPages, ...productFetch } = useGetProductList({...pagination}); // empty query object === a blank query === "all"
//   // const { products, totalPages, ...productFetch } = useGetProductList({title: 'demo', ...pagination}); // empty query object === a blank query === "all"

//   // const { list: productListDemo, ...productFetchDemo } = useGetProductList({ description: "demo", title: "demo" }); //  additional list fetch
  
//   const isEmpty = (
//     !products
//     || products.length === 0
//     // || !productListDemo
//     // || productListDemo.length === 0
//   );

//   return (
//     <ProductLayout title={'Product List'}>
//       <div className="flex w-full mb-4 justify-end">
//         <Button
//           link='/products2/new'
//           size="sm"
//           flavor="secondary" //  wanted to call this type, but buttons have a native "type", maybe "variety" or "species"??
//         >
//           New Product
//         </Button>
//       </div>
//       <List
//         // pass pagination into the List component and it will display the PageTabber below the list
//         pagination={pagination}
//         setPage={setPage}
//         setPer={setPer}
//         totalPages={totalPages}
//       >
//       {/* pass the fetch info along to this component to handle the loading and error states */}
//         <AsyncWrapper {...productFetch}>
//           {/* we can combine fetch meta like this and true values will override false meaning IT JUST WORKS */}
//           {/* <AsyncWrapper {...{...productFetch, ...productFetchDemo}}> */}
//           {isEmpty ?
//             (<div>No products found</div>)
//             :
//             products.map((product) => (
//               <ProductListItem key={product._id} product={product} />
//             ))
//           }
//         </AsyncWrapper>
//       </List>
//     </ProductLayout>
//   )
// }

// export default ProductList;


// // import primary libraries
// import React from 'react'
// // import PropTypes from 'prop-types'; // this component gets no props

// // import actions/reducer
// import { useGetProductList } from '../productService';

// // import global components
// import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';
// import List from '../../../global/components/base/List';
// import Button from '../../../global/components/base/Button';

// // import resource components
// import ProductListItem from '../components/ProductListItem.js.jsx';
// import ProductLayout from '../components/ProductLayout.js.jsx';
// import { usePagination } from '../../../global/utils/customHooks';

// const ProductList = () => {
//   // get the list from the store (or fetch it from the server)
//   // const {pagination, setPage, setPer} = usePagination();
//   const pagination = usePagination({ page: 1, per: 10 });
  
//   const { data: products, totalPages, ...productFetch } = useGetProductList({ page: pagination.page, per: pagination.per }); // empty query object === a blank query === "all"
  
//   const isEmpty = (
//     !products
//     || products.length === 0
//   );

//   return (
//     <ProductLayout title={'Product List'}>
//       <div className="flex w-full mb-4 justify-end">
//         <Button
//           link='/products2/new'
//           size="sm"
//           flavor="secondary" //  wanted to call this type, but buttons have a native "type", maybe "variety" or "species"??
//         >
//           New Product
//         </Button>
//       </div>




//       <List {...pagination} totalPages={totalPages} >
//         <AsyncWrapper {...productFetch}>
//           {isEmpty ?
//             (<div>No products found</div>)
//             :
//             products.map((product) => (
//               <ProductListItem key={product._id} product={product} />
//             ))
//           }
//         </AsyncWrapper>
//       </List>




//     </ProductLayout>
//   )
// }



// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props

// import actions/reducer
import { useGetProductList } from '../productService';

// import global components
import List from '../../../global/components/base/List';
import Button from '../../../global/components/base/Button';

// import resource components
import ProductListItem from '../components/ProductListItem.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';
// import AsyncWrapper from '../../../global/components/helpers/AsyncWrapper';
import Fetchie from '../../../global/components/helpers/AsyncWrapper';

const ProductList = () => {
  const productList = useGetProductList({ page: 1, per: 10 });
  
  return (
    <ProductLayout title={'Product List'}>
      <div className="flex w-full mb-4 justify-end">
        <Button
          link='/products2/new'
          size="sm"
          flavor="secondary" //  wanted to call this type, but buttons have a native "type", maybe "variety" or "species"??
        >
          New Product
        </Button>
      </div>
      <Fetchie fetch={productList} >
        {(products, pagination) => (
          <List
            pagination={pagination}
            className={`${productList.isFetching ? 'opacity-50' : ''}`}
          >
            { products.map(product => (
              <ProductListItem key={product._id} product={product} />
            ))}
          </List>
        )}
      </Fetchie>
    </ProductLayout>
  )
}

export default ProductList;
