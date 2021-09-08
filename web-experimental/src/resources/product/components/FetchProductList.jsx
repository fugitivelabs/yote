// import primary libraries

import React from 'react';
import WaitOn from '../../../global/components/helpers/WaitOn';

import { useGetProductList } from '../productService';

const callRender = ({ data: productList, pagination, refetch }) => render({ productList, pagination, refetch });

const FetchProductList = ({ fallback, query, render }) => {
  
  const productListFetch = useGetProductList(query);
  
  // const callRender = ({ data: productList, pagination, refetch }) => render({ productList, pagination, refetch });
  
  return (
    <WaitOn
      fetch={productListFetch}
      fallback={fallback}
      // fallback={(<ListSkeleton/>)} // Show something cool instead of just a spinner.
      // render={({ data: productList, pagination, refetch }) => render({ productList, pagination, refetch })}
      render={callRender}
    />
  )
}

export default FetchProductList;