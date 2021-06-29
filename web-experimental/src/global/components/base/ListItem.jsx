
import React from 'react';

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

export default ListItem