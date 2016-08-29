import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'

// import TopNav from "../../../global/components/TopNav.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

class PostLayout extends Base {
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

export default PostLayout;
