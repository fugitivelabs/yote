
import React from 'react';
import PropTypes from 'prop-types'

import PageTabber from '../helpers/PageTabber'

const PaginatedList = ({
  children
  , className
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
    <ul className={`list-none p-2 ${className}`}>
      {children}
      {page && per && setPage ?
        <PageTabber
          pagination={{ page: page, per: per }}
          setPage={setPage}
          totalPages={totalPages}
        />
        :
        null
      }
    </ul>
  )
}

PaginatedList.propTypes = {
  classes: PropTypes.string
  , pagination: PropTypes.shape({
    page: PropTypes.number
    , per: PropTypes.number
    , setPage: PropTypes.func
    , setPer: PropTypes.func
    , totalPages: PropTypes.number
  })
}

PaginatedList.defaultProps = {
  classes: ''
  , pagination: {}
}
export default PaginatedList