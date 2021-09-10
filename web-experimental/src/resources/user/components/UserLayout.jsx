/**
 * Wraps all non-admin User components in a default view wrapper
 * is a class in case you want some extra special logic...
 */

// import primary libraries
import React from 'react';

// import global components
const UserLayout = ({ ...props }) => {
  return (
    <div className="container">
      <div className="container mx-auto">
        {props.children}
      </div>
    </div>
  )
}

export default UserLayout;
