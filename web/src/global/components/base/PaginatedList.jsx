
import React from 'react';
import PropTypes from 'prop-types'

import PageTabber from '../helpers/PageTabber'

const PaginatedList = ({
  children
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
    <ul className="list-none">
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