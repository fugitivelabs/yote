/**
 * Same as the other product list, but with a search input that leverages server-side search
 */

// import primary libraries
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'; // this component gets no props

// import global components
import PaginatedList from '../../../global/components/base/PaginatedList';
import WaitOn from '../../../global/components/helpers/WaitOn';
import { SearchInput } from '../../../global/components/forms';

// import resource components
import ProductListItem from '../components/ProductListItem.jsx';
import ProductLayout from '../components/ProductLayout.jsx';

// import services
import { useGetProductList } from '../productService';
import { useURLSearchParams } from '../../../global/utils/customHooks';

const SearchableProductList = () => {
  // the server api will catch for this specific key `textSearch` and use it to search any indexed fields
  const [productListArgs, handleChange] = useURLSearchParams({ page: 1, per: 25, sort: '-updated', textSearch: '' });
  const { data: products, ids, pagination, ...productQuery } = useGetProductList(productListArgs);

  return (
    <ProductLayout title={'Search Product List'}>
      <section className="max-w-screen-lg xs: w- border border-solid bg-white shadow-sm rounded-sm mx-auto">
        <header className="flex items-center justify-between border-solid border-t-0 border-l-0 border-r-0 border-b p-2">
          <h1 className="p-2 m-0">Product List</h1>
          <div className="p-2">
            <Link to="/products/new" className="text-sm p-2 px-8 rounded-full border-solid bg-white text-gray-800 border-gray-800 cursor-pointer no-underline font-semibold">New Product</Link>
          </div>
        </header>
        <PaginatedList
          as='div'
          className={`scroll-mt-4 ${productQuery.isFetching ? 'opacity-50' : ''}`}
          {...pagination}
          setPage={(newPage) => handleChange('page', newPage)}
        >
          <div className="max-w-xs">
            <SearchInput
              name="textSearch"
              change={(e) => handleChange('textSearch', e.target.value)}
              placeholder="Search Products"
              value={productListArgs.textSearch}
              debounceTime={300}
            />
          </div>
          <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
            {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
          </WaitOn>
        </PaginatedList>
      </section>
    </ProductLayout>
  )
}

const Skeleton = ({ count = 5 }) => {
  const items = new Array(count).fill('product-list-item-skeleton');
  return items.map((name, index) => <ProductListItem.Skeleton key={`${name} ${index}`} />)
}


export default SearchableProductList;
