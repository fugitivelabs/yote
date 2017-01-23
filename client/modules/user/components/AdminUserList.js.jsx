import React, { PropTypes } from 'react';
import { Link, Router } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { listActions }from '../actions';

// import components
import AdminUserListItem from './AdminUserListItem.js.jsx';

class AdminUserList extends Base {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.dispatch(listActions.fetchList());
  }

  render() {
    const { list, params, activeFilter } = this.props;
    const isEmpty = list.items.length === 0;
    //try to tell me that this next line isn't cool as hell. go ahead, try. es6 ftw.
    const filteredItems = list.filter ?
      list.items.filter((item) => item.status == list.filter.status)
      : list.items
    return(
      <div className="yt-container">
        <h3> All Registered Users
          <Link className="yt-btn small u-pullRight" to={'/admin/users/new'}> NEW USER </Link>
        </h3>
        <hr/>
        <p className="large">Here you can create, edit, and add permissions to users</p>
        {isEmpty
          ? (list.isFetching ? <h5>Loading...</h5> : <h5>Empty.</h5>)
            : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
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
                {filteredItems.map((item, i) =>
                  <AdminUserListItem
                    key={i}
                    user={item}
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
  console.log("list state");
  console.log(store);
  const { user } = store;
  const list = user.list;
  return {
    list: list
    , activeFilter: user.list.filter
  }
}

export default connect(
  mapStoreToProps
)(AdminUserList);
