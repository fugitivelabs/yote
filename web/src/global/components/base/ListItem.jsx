
import React from 'react';
import PropTypes from 'prop-types'

const ListItem = ({
  children
  , className = ''
}) => {

  return (
    <li className={"bg-white shadow overflow-hidden rounded-md px-6 py-4 " + className}>
      {children}
    </li>
  )
}

ListItem.propTypes = {
  className: PropTypes.string
}

export default ListItem