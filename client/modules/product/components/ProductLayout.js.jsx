/**
 * Wraps all Product components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React, { PropTypes } from 'react';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";


class ProductLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout>
        {this.props.children}
      </DefaultLayout>
    )
  }
}

export default ProductLayout;
