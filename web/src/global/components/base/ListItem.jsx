
import React from 'react';
import PropTypes from 'prop-types'

const ListItem = ({
  children
  , className = ''
}) => {

  return (
    <div className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 " + className}>
      {children}
    </div>
  )
}

ListItem.propTypes = {
  className: PropTypes.string
}

export default ListItem