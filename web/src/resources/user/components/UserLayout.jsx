/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React, { useEffect } from 'react';

// import global components
const UserLayout = ({ title, children }) => {
  // this can replace react-helmet if all we need to do is set the page title.
  useEffect(() => {
    document.title = title || "Yote App | User";
  }, [title])
  return (
    <div>
      {children}
    </div>
  )
}

export default UserLayout;
