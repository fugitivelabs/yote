/**
 * View component for /admin/users
 *
 * Displays a paginated list of all users in the system.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as userActions from '../../userActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import PageTabber from '../../../../global/components/pagination/PageTabber.js.jsx';
import { SearchInput } from  '../../../../global/components/forms';

// import utilities
import filterUtils from '../../../../global/utils/filterUtils';

// import user components
import AdminUserLayout from '../components/AdminUserLayout.js.jsx';
import AdminUserListItem from '../components/AdminUserListItem.js.jsx';

class AdminUserList extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      queryText: this.props.query || ''
      , perPage: 50
    };
    this._bind(
      '_handleQuery'
      , '_resetPagination'
      , '_setPerPage'
      , '_handleSetPagination'
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.fetchListIfNeeded());
    dispatch(userActions.setFilter(''));
    dispatch(userActions.setQuery(''));
    dispatch(userActions.setPagination({page: 1, per: 50}));
  }

  _resetPagination() {
    const { dispatch } = this.props;
    dispatch(userActions.setPagination({
      page: 1,
      per: parseInt(this.state.perPage)
    }));
  }

  _setPerPage(per) {
    const { dispatch } = this.props;
    var newPagination = this.props.userList.pagination;
    newPagination.per = parseInt(per);
    newPagination.page = 1;
    dispatch(userActions.setPagination(newPagination));
    this.setState({perPage: per});
  }

  _handleSetPagination(newPagination) {
    const { dispatch } = this.props;
    dispatch(userActions.setPagination(newPagination));
  }

  _handleQuery(e) {
    const { dispatch } = this.props;
    // always defaulting the page to page 1 so we can see our results
    var pagination = {};
    pagination.page = 1;
    pagination.per = this.props.userList.pagination.per;
    this._handleSetPagination(pagination);
    // continue query logic
    dispatch(userActions.setQuery(e.target.value.toLowerCase()));
    this.setState({queryText: e.target.value.toLowerCase()});
  }

  render() {
    const { params, userList, activeFilter, pagination, paginatedList, sortedList, userMap } = this.props;
    const { queryText } = this.state;
    /**
     * NOTE: Regarding isEmpty, when the app loads, all "product lists"
     * are null objects. They exist only after we create them.
     */
    const isEmpty = !userList || userList.items.length === 0 || userList.didInvalidate;
    const sortedEmpty = sortedList.length === 0;
    console.log("render admin users ")
    return (
      <AdminUserLayout>
        <h3> All Registered Users
        </h3>
        <Link className="yt-btn small u-pullRight" to={'/admin/users/new'}> NEW USER </Link>
        <hr/>
        <p className="large">Here you can create, edit, and add permissions to users</p>
        { isEmpty ?
          (userList && userList.isFetching ? <h5>Loading...</h5> : <h5>Empty.</h5>)
          :
          <div style={{ opacity: userList.isFetching ? 0.5 : 1 }}>
            <div className="yt-toolbar">
              <div className="yt-tools right">
                <div className="search">
                  <SearchInput
                    name="query"
                    value={queryText}
                    change={this._handleQuery}
                    placeholder="Search..."
                    required={false}
                  />
                </div>
              </div>
            </div>
            <table className="yt-table striped">
              <caption>
                { queryText.length > 0 ?
                  <span>Filtered Users &mdash; {sortedList.length} of {Object.keys(userList.items).length}</span>
                  :
                  <span>All Users &mdash; {Object.keys(userList.items).length}</span>
                }
                <div className="per-page-select u-pullRight">
                  <label>Show per page: </label>
                  <select
                    name="numPerPage"
                    onChange={(e) => this._setPerPage(e.target.value)}
                    value={this.state.perPage}
                    >
                    <option value={25}> 25 </option>
                    <option value={50}> 50 </option>
                    <option value={100}> 100 </option>
                  </select>
                </div>
              </caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th className="numbers">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((user, i) =>
                  <AdminUserListItem
                    key={i}
                    user={user}
                    />
                )}
              </tbody>
            </table>
            { sortedEmpty ?
              null
              :
              <PageTabber
                totalPages={ Math.floor(sortedList.length / userList.pagination.per) + 1}
                pagination={userList.pagination}
                setPagination={this._handleSetPagination}
                />
            }
          </div>
        }
      </AdminUserLayout>
    )
  }
}

AdminUserList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  const userMap = store.user.byId;
  const userList = store.user.lists.all;

  let sortedList = [];
  let paginatedList = [];
  let filteredByQuery = [];
  if (userList) {

    const pagination = userList.pagination;
    const filter = userList.filter;
    const query = userList.query;

    // FILTER BY QUERY
    var queryTestString = ("" + query).toLowerCase().trim();
    queryTestString = queryTestString.replace(/[^a-zA-Z0-9]/g,''); // replace all non-characters and numbers
    filteredByQuery = userList.items.filter((userId) => {
      return filterUtils.filterUser(queryTestString, userMap[userId]);
    });

    // SORT THE LIST
    sortedList = filteredByQuery.map((item) => {
      var newItem = userMap[item];
      return newItem;
    });

    // apply pagination
    var start = (pagination.page - 1) * pagination.per;
    var end = start + pagination.per;
    paginatedList = _.slice(sortedList, start, end);

  }
  return {
    userList
    , userMap
    , paginatedList
    , sortedList
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminUserList)
);
