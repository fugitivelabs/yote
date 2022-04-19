/**
 * Same as the other product list, but with a search input that uses
 */

// import primary libraries
import React, { useState } from 'react'
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

const SearchableProductList = () => {
  const initialPagination = { page: 1, per: 10 };
  const [queryArgs, setQueryArgs] = useState({
    // the server api will catch for this specific key `textSearch` and use it to search any indexed fields
    textSearch: '' // search all by default
  })

  const { data: products, ids, pagination, ...productQuery } = useGetProductList({...queryArgs, ...initialPagination});

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    // go back to page 1 when a new search term is entered
    pagination.setPage(1);
    // each time query args are changed, the api will be called with the new args
    // we're debouncing the search input to avoid calling the api on every keystroke
    setQueryArgs(args => ({
      ...args
      , [name]: value
    }))
  }

  return (
    <ProductLayout title={'Search Product List'}>
      <section className="max-w-screen-lg xs: w- border border-solid bg-white shadow-sm rounded-sm mx-auto">
        <header className="flex items-center justify-between border-solid border-t-0 border-l-0 border-r-0 border-b p-2">
          <h1 className="p-2 m-0">Product List</h1>
          <div className="p-2">
            <Link to="/products/new" className="text-sm p-2 px-8 rounded-full border-solid bg-white text-gray-800 border-gray-800 cursor-pointer no-underline font-semibold">New Product</Link>
          </div>
        </header>
        <div className="max-w-xs">
          <SearchInput
            name="textSearch"
            change={handleQueryChange}
            placeholder="Search Products"
            value={queryArgs.textSearch}
            debounceTime={300}
          />
        </div>
        <PaginatedList
          pagination={pagination}
          className={`${productQuery.isFetching ? 'opacity-50' : ''}`}
        >
          <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
            {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
          </WaitOn>
        </PaginatedList>
      </section>
    </ProductLayout>
  )
}

const Skeleton = ({ count = 5 }) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ProductListItem.Skeleton key={Math.random()} />)
}


export default SearchableProductList;
