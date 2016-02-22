import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";

import TopNav from "../../../global/components/TopNav.js.jsx";

import { connect } from 'react-redux';


class UserLayout extends Base {
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

export default UserLayout;
