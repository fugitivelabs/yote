import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'


import { connect } from 'react-redux';


class PostLayout extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default PostLayout;
