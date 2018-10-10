/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';
import Footer from '../navigation/Footer.js.jsx';
import DefaultTopNav from '../navigation/DefaultTopNav.js.jsx';

export default class DefaultLayout extends Binder {
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
        <DefaultTopNav />
        <div className={bodyClass}>
          <div className="yt-container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
