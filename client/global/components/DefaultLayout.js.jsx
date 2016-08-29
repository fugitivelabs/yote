// import React from 'react';
import React, { PropTypes } from 'react';
import Base from './BaseComponent.js.jsx';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import classNames from 'classnames';


import TopNav from './TopNav.js.jsx';
import Footer from './Footer.js.jsx';

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
