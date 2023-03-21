// import primary libraries
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import global components
import Spinner from '../../../global/components/helpers/Spinner.jsx';

/**
 * Wraps all non-admin User components in a default view wrapper.
 * @param title - the title of the page (shows up on the browser tab)
 * @param className - the className to apply to the wrapper
 */
const UserLayout = ({
  children
  , className
  , title
}) => {
  useEffect(() => {
    document.title = title ? `${title} | Yote` : "Yote App";
  }, [title])

  return (
    <div className={className}>
      {children}
    </div>
  )
}

UserLayout.Skeleton = (props) => {
  return (
    <UserLayout title="Loading..." {...props}>
      <Spinner />
    </UserLayout>
  )
}

UserLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node)
    , PropTypes.node
  ]).isRequired
  , className: PropTypes.string
  , title: PropTypes.string
}

export default UserLayout;
