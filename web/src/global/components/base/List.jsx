
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
    <div className={"space-y-3 " + className}>
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
    </div>
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

List.defaultProps = {
  pagination: {}
}
export default List