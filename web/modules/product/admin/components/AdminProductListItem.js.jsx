// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

// import global components
import Base from '../../../global/components/BaseComponent.js.jsx';

const AdminStudyUserListItem = ({
  product
}) => {
  const hasOnboarded = _.findIndex(userEvents, {eventAction: "onboarded"}) > -1;
  const sorted = _.orderBy(userEvents, [item => item.created], ['desc']);

  return (
    <tr >
      <td className="_20"><Link to={`/admin/products/${product._id}`}>{studyUser.title}</Link></td>
      <td className="_20">{_.startCase(studyUser.role)}</td>
      <td className="_10">{studyUser.siteNumber}</td>
      <td className="_20">{DateTime.fromISO(studyUser.updated).toLocaleString(DateTime.DATE_SHORT)}</td>
      <td className="_20"><Link to={`/admin/products/${product._id}`}>View</Link> <Link to={`/admin/products/${product._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminStudyUserListItem.propTypes = {
  study: PropTypes.object
  , studyUser: PropTypes.object.isRequired
  , userEvents: PropTypes.array
}

AdminStudyUserListItem.defaultProps = {
  userEvents: []
}

export default withRouter(AdminStudyUserListItem);
