import React, { PropTypes } from 'react';
import { Link, Router } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import * as userActions from '../userActions';

// import components
import AdminUserListItem from './AdminUserListItem.js.jsx';

class AdminUserList extends Base {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(userActions.fetchListIfNeeded());
  }

  render() {
    const { params, userList, userMap } = this.props;
    const isEmpty = !userList || userList.items.length === 0 || userList.didInvalidate;
    //try to tell me that this next line isn't cool as hell. go ahead, try. es6 ftw.
    return(
      <div className="yt-container">
        <h3> All Registered Users
          <Link className="yt-btn small u-pullRight" to={'/admin/users/new'}> NEW USER </Link>
        </h3>
        <hr/>
        <p className="large">Here you can create, edit, and add permissions to users</p>
        { isEmpty
          ? (userList && userList.isFetching ? <h5>Loading...</h5> : <h5>Empty.</h5>)
          : <div style={{ opacity: userList.isFetching ? 0.5 : 1 }}>
            <div className="yt-toolbar">
              <div className="yt-tools space-between">
                <div className="filters">
                  Filter By:
                </div>
                <div className="search">
                  Search:
                  <input type="search" placeholder="Coming soon..." disabled/>
                </div>
              </div>
            </div>
            <table className="yt-table striped">
            <caption> All Users </caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th className="numbers">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {userList.items.map((id, i) =>
                <AdminUserListItem
                  key={id}
                  user={userMap[id]}
                />
              )}
            </tbody>
          </table>
          </div>
        }
      </div>
    )
  }
}


AdminUserList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    userList: store.user.lists.all
    , userMap: store.user.byId
  }
}

export default connect(
  mapStoreToProps
)(AdminUserList);
