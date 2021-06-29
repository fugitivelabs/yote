
import React from 'react';
import PropTypes from 'prop-types'

import PageTabber from '../helpers/PageTabber'

const List = ({
  children
  , className = ''
  , pagination
  , setPage
  , setPer
  , totalPages
}) => {
  // TODO: Add UI to use setPer
  return (
    <ul className={"space-y-3 " + className}>
      {children}
      {pagination && setPage && totalPages ?
        <PageTabber
          pagination={pagination}
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
  })
  , setPage: PropTypes.func
  , setPer: PropTypes.func
  , totalPages: PropTypes.number
}

export default List