/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Spinner from '../helpers/Spinner.jsx';
// TODO: Maybe find an alternative to react-helmet since it's out of date and causes react to throw warnings
// import { Helmet }  from 'react-helmet'

// import nav components
import DefaultNav from '../navigation/DefaultNav.jsx';


const DefaultLayout = ({
  children
  , className = ''
  , title
}) => {

  // this can replace react-helmet if all we need to do is set the page title.
  useEffect(() => {
    document.title = title ? `${title} | Yote` : "Yote App";
  }, [title])

  return (
    <div>
      {/* <Helmet title={props.title || "Yote App"}/> */}
      <DefaultNav />
      <main className={`py-10 px-2 container mx-auto ${className}`}>
        {children}
      </main>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node)
    , PropTypes.node
  ]).isRequired
  , className: PropTypes.string
  , title: PropTypes.string
}


DefaultLayout.Skeleton = (props) => {
  return (
    <DefaultLayout title="Loading..." {...props}>
      <Spinner />
    </DefaultLayout>
  )
}

export default DefaultLayout;
