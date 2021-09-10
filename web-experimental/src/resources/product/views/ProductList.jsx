// import primary libraries
import React from 'react'
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
import Button from '../../../global/components/base/Button';
import List from '../../../global/components/base/List';
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
      <div className="flex w-full mb-4 justify-end">
        <Button
          link='/products/new'
          size="sm"
          skin="secondary"
        >
          New Product
        </Button>
      </div>
      <List
        pagination={pagination}
        className={`${productQuery.isFetching ? 'opacity-50' : ''}`}
      >
        <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
          {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </List>
    </ProductLayout>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ProductListItem.Skeleton key={Math.random()}/>)
}


export default ProductList;
