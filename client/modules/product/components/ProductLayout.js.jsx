import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux';
// import { push }

class ProductLayout extends Base {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // console.log("product layout mounting");
    // NewsActions.fetchList();
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
