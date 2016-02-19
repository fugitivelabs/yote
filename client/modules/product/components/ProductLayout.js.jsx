import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'


import { connect } from 'react-redux';
// import { push }

class ProductLayout extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    // console.log("product layout mounting");
    // NewsActions.fetchList();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default ProductLayout;
