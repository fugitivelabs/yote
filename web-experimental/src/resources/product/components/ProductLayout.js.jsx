/**
 * Wraps all Product views in a wrapping container. If you want to give all
 * product views a sidebar for example, you would set that here.
 */

// import primary libraries
import React from 'react';

// import global components
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.js.jsx'; // doesn't exist yet

const ProductLayout = ({...props}) => {
  return (
    <DefaultLayout>
      {props.children}
    </DefaultLayout>
  )
}

export default ProductLayout;
