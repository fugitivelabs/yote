// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';

// import other libraries
import moment from 'moment';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

class AdminUserListItem extends Base {
  constructor(props) {
    super(props);
  }

  _goToUser(userId) {
    browserHistory.push(`/admin/users/${userId}`)
  }

  render() {
    const { user } = this.props;
    const modified =  moment(user.updated).calendar();
    return (
      <tr className="linkable" onClick={this._goToUser.bind(this, user._id)}>
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.username}</td>
        <td className="">{user.roles}</td>
        <td className="numbers">{modified}</td>
      </tr>
    )
  }
}

AdminUserListItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default AdminUserListItem;
