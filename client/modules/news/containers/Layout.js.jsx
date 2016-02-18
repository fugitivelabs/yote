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
    console.log("news layout mounting");
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

// Layout.propTypes = {
//   dispatch: PropTypes.func.isRequired
// }

export default Layout;
