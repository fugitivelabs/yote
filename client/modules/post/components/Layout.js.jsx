import React, { Component, PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'


import { connect } from 'react-redux';
// import { push }

class Layout extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    // console.log("post layout mounting");
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

export default Layout;
