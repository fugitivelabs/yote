// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// import other libraries
import moment from 'moment';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';

class AdminUserListItem extends Binder {
  constructor(props) {
    super(props);
  }

  _goToUser(userId) {
    this.props.history.push(`/admin/users/${userId}`)
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

export default withRouter(AdminUserListItem);
