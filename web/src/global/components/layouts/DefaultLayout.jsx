/**
 * Will act as the default wrapper for all module states within the application
 * that call it within their own Layouts
 */

// import primary libraries
import React, { useEffect } from 'react';
import Spinner from '../helpers/Spinner.jsx';
// TODO: Maybe find an alternative to react-helmet since it's out of date and causes react to throw warnings
// import { Helmet }  from 'react-helmet'

// import nav components
import DefaultNav from '../navigation/DefaultNav.jsx';


const DefaultLayout = ({ ...props }) => {
  const {
    children
    , title
  } = props;
  
  // this can replace react-helmet if all we need to do is set the page title.
  useEffect(() => {
    document.title = title || "Yote App";
  }, [title])

  return (
    <div>
      {/* <Helmet title={props.title || "Yote App"}/> */}
      <DefaultNav />
      <main class="py-20">
        {children}
      </main>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div>
      <DefaultNav />
      <main>
        <div className="">
          <Spinner/>
        </div>
      </main>
    </div>
  )
}

DefaultLayout.Skeleton = Skeleton;

export default DefaultLayout;
