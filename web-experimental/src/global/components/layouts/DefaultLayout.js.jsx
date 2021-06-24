/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React from 'react';
// TODO: Maybe find an alternative to react-helmet since it's out of date and causes react to throw warnings
import { Helmet }  from 'react-helmet'

// import nav components
import Footer from '../navigation/Footer.js.jsx';
import DefaultTopNav from '../navigation/DefaultTopNav.js.jsx';

const DefaultLayout = ({...props}) => {
  return (
    <div className="container mx-auto">
      <Helmet title={props.title || "Yote App"}/>
      <DefaultTopNav />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout

