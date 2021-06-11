/**
 * Helper component to generate breadcrumbs in the admin layout
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const AdminBreadcrumbs = ({ links }) => {
  return (
    <div className="breadcrumbs">
      { links.map((link, i) =>
        <span key={link.path + i}>
          { i < links.length -1 ?
              <span> <Link to={link.path}>{link.display}</Link> :: </span>
            :
              <span> {link.display} </span>
          }
        </span>
      )}
    </div>
  )
}

AdminBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired
}

export default withRouter(AdminBreadcrumbs);
