/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React from 'react';

// import nav components
import Footer from '../navigation/Footer.js.jsx';
import DefaultTopNav from '../navigation/DefaultTopNav.js.jsx';

const DefaultLayout = ({...props}) => {
  return (
    <div className="container mx-auto">
      <DefaultTopNav />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout

