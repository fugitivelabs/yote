
import React from 'react';
import PropTypes from 'prop-types'

const ListItem = ({
  children
  , classes = ''
}) => {

  return (
    <li className={classes}>
      {children}
    </li>
  )
}

ListItem.propTypes = {
  className: PropTypes.string
}

export default ListItem