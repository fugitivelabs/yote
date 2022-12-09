/**
 * Wraps all Product views in a wrapping container. If you want to give all
 * product views a sidebar for example, you would set that here.
 * 
 * Accepts a "title" prop and passes it down to be used by React Helmet
 * This allows us to easily update the browser tab title on each view.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types'

// import global components
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.jsx';

const ProductLayout = ({
  children
  , className
  , title = "Product"
}) => {
  return (
    <DefaultLayout title={title} className={className}>
      {children}
    </DefaultLayout>
  )
}

// assign the default layout skeleton to the ProductLayout until it needs a custom one
ProductLayout.Skeleton = DefaultLayout.Skeleton;

ProductLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node)
    , PropTypes.node
  ]).isRequired
  , className: PropTypes.string
  , title: PropTypes.string
}

export default ProductLayout;
