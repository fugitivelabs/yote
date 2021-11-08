// import primary libraries
import React from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
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
      <section className="max-w-screen-lg border border-solid bg-secondary shadow-sm rounded-sm mx-auto">
        <header className="flex items-center justify-between border-solid border-t-0 border-l-0 border-r-0 border-b p-2">
          <h1 className="p-2 m-0 text-primary">Product List</h1>
          <div className="p-2">
            <Link to="/products/new" className="text-sm p-2 px-8 rounded-full border-solid bg-secondary text-secondary border-secondary cursor-pointer no-underline font-semibold">New Product</Link>
          </div>
        </header>
        <PaginatedList
          pagination={pagination}
          className={`${productQuery.isFetching ? 'opacity-50' : ''}`}
        >
          <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
            {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
            {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
          </WaitOn>
        </PaginatedList>
      </section>
    </ProductLayout>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ProductListItem.Skeleton key={Math.random()}/>)
}


export default ProductList;
