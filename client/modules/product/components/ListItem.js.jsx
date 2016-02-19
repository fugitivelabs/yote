import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const ListItem = ({ product }) => {

  return (
    <li>

      <Link to={`/products/${product._id}`}> {product.title}</Link>

    </li>
  )
}

ListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ListItem;
