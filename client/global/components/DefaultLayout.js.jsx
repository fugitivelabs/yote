/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import components
import Base from './BaseComponent.js.jsx';
import Footer from './navigation/Footer.js.jsx';
import TopNav from './navigation/TopNav.js.jsx';

export default class DefaultLayout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    let bodyClass = classNames(
      'body'
      , 'with-header'
      // , { 'dark': initialNavClass == 'dark' }
    )

    return (
      <div className="master-layout">
        <TopNav />
        <div className={bodyClass}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
