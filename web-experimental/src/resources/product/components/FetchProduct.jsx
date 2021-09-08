
import React from 'react';
// import AsyncProvider from '../../../global/components/helpers/WaitOn';
import WaitOn from '../../../global/components/helpers/WaitOn';

import { useGetProductById } from '../productService';


const FetchProduct = ({ fallback, id, render }) => {

  const productFetch = useGetProductById(id);

  return (
    // <AsyncProvider fetch={productFetch}>
    //   {children}
    // </AsyncProvider>

    <WaitOn fetch={productFetch} fallback={fallback} render={({ data: product }) => render({product})}/>
  )
}

export default FetchProduct;