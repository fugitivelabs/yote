
import React from 'react';
import PropTypes from 'prop-types'

import PageTabber from '../helpers/PageTabber'

const PaginatedList = ({
  as: Wrapper = 'ul' // the wrapper element for the list ('div', 'table', etc..), 'ul' by default
  , children
  , className
  , page
  , per
  , setPage
  , totalPages
}) => {
  // TODO: Add UI to use setPer
  const listRef = React.useRef(null);
  return (
    <Wrapper className={`${className}`} ref={listRef}>
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
    </Wrapper>
  )
}

PaginatedList.propTypes = {
  className: PropTypes.string
  , page: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  , per: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  , setPage: PropTypes.func
  , totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

PaginatedList.defaultProps = {
  className: ''
  , pagination: {}
}
export default PaginatedList