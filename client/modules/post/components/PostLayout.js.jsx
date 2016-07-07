import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { bindActionCreators } from 'redux'

import TopNav from "../../../global/components/TopNav.js.jsx";

class PostLayout extends Base {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="flex main landing-wrapper with-topbar">
        <TopNav/>
        {this.props.children}
      </div>
    )
  }
}

export default PostLayout;
