// import primary libraries
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
import Button from '../../../global/components/base/Button';
import PaginatedList from '../../../global/components/base/PaginatedList';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductListItem from '../components/ProductListItem.jsx';
import ProductLayout from '../components/ProductLayout.jsx';

// import services
import { useGetProductList } from '../productService';

const ProductList = () => {
  const { data: products, ids, pagination, ...productQuery } = useGetProductList({ page: 1, per: 5 });
  
  return (
    <ProductLayout title={'Product List'}>
      <h1>Product List</h1>
      <div className="">
        <Link to="/products/new">New Product</Link>
      </div>
      <PaginatedList
        pagination={pagination}
        className={`${productQuery.isFetching ? 'opacity-50' : ''}`}
      >
        <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
          {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </PaginatedList>
    </ProductLayout>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ProductListItem.Skeleton key={Math.random()}/>)
}


export default ProductList;
