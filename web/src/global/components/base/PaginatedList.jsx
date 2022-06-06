
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
  const listRef = React.useRef(null);
  return (
    <ul className={`p-2 ${className}`} ref={listRef}>
      {children}
      {page && per && setPage ?
        <PageTabber
          pagination={{ page: page, per: per }}
          setPage={setPage}
          totalPages={totalPages}
          onSetPage={() => listRef.current.scrollIntoView({ behavior: 'smooth' })} // scroll to top of list when page changes
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