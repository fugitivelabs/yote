



// import React from 'react';
// import PropTypes from 'prop-types'

// import AsyncWrapper from '../helpers/AsyncWrapper';

// import PageTabber from '../helpers/PageTabber'

// const List = ({
//   children
//   , className = ''
//   , page
//   , per
//   , setPage
//   , setPer
//   , totalPages
//   , items
//   , isLoading
//   , isFetching
//   , isError
//   , isSuccess
//   , isEmpty
//   , refetch
// }) => {
//   // TODO: Add UI to use setPer
//   console.log('items', items);
//   return (
//     <ul className={`space-y-3 ${className} ${isFetching && 'opacity-50'}`}>
//       <AsyncWrapper
//         isLoading={isLoading}
//         isError={isError}
//         isSuccess={isSuccess}
//         isEmpty={isEmpty}
//         refetch={refetch}
//         fallback={<ListItemSkeleton count={5} />}
//       >
//       {items && children({items})}
//       {page && per && setPage && totalPages ?
//         <PageTabber
//           pagination={{page, per}}
//           setPage={setPage}
//           totalPages={totalPages}
//         />
//         :
//         null
//       }
//       </AsyncWrapper>
//     </ul>
//   )
// }

// List.propTypes = {
//   className: PropTypes.string
//   , pagination: PropTypes.shape({
//     page: PropTypes.number
//     , per: PropTypes.number
//   })
//   , setPage: PropTypes.func
//   , setPer: PropTypes.func
//   , totalPages: PropTypes.number
// }

// export default List

// const ListItemSkeleton = ({
//   count = 1
// }) => {
//   const mappy = new Array(count);
//   console.log('mappy', mappy);
//   return (
//     <>
//      <li className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 "}>
//         <div className=" w-6/12 bg-blue-300 h-4 my-2" />
//         <div className=" w-9/12 bg-blue-300 h-4" />
//       </li>
//       <li className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 "}>
//         <div className=" w-6/12 bg-blue-300 h-4 my-2" />
//         <div className=" w-9/12 bg-blue-300 h-4" />
//       </li>
//       <li className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 "}>
//         <div className=" w-6/12 bg-blue-300 h-4 my-2" />
//         <div className=" w-9/12 bg-blue-300 h-4" />
//       </li>
//       <li className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 "}>
//         <div className=" w-6/12 bg-blue-300 h-4 my-2" />
//         <div className=" w-9/12 bg-blue-300 h-4" />
//       </li>
//     </>
// )}

import React from 'react';
import PropTypes from 'prop-types'

import PageTabber from '../helpers/PageTabber'

const List = ({
  children
  , className = ''
  , pagination: {
    page
    , per
    , setPage
    , setPer
    , totalPages
  }
}) => {
  // TODO: Add UI to use setPer
  return (
    <ul className={"space-y-3 " + className}>
      {children}
      {page && per && setPage && totalPages ?
        <PageTabber
          pagination={{page: page, per: per}}
          setPage={setPage}
          totalPages={totalPages}
        />
        :
        null
      }
    </ul>
  )
}

List.propTypes = {
  className: PropTypes.string
  , pagination: PropTypes.shape({
    page: PropTypes.number
    , per: PropTypes.number
    , setPage: PropTypes.func
    , setPer: PropTypes.func
    , totalPages: PropTypes.number
  })
}

export default List