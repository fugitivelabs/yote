// import primary libraries
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../userActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import user components
import AdminUserForm from './AdminUserForm.js.jsx';

class AdminUpdateUser extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userMap[props.selectedUser.id] ? JSON.parse(JSON.stringify(props.userMap[props.selectedUser.id])) : {}
      // NOTE: we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(userActions.fetchSingleIfNeeded(params.userId));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedUser, userMap } = nextProps;
    this.setState({
      user: userMap[selectedUser.id] ? JSON.parse(JSON.stringify(userMap[selectedUser.id])) : {test: "a"}
    })
    // NOTE: again, we don't want to change the store, just make changes to a copy
  }

  _handleFormChange(e) {
    let nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendUpdateUser(this.state.user)).then((action) => {
      if(action.success) {
        browserHistory.push('/admin/users')
      } else {
        alert("ERROR UPDATING USER: ", action.message);
      }
    });
  }

  render() {
    const { selectedUser, userMap } = this.props;
    const { user } = this.state;
    const isEmpty = !user || !user.username;
    return  (
      <div>
        { isEmpty ?
          <h2> Loading... </h2>
          :
          <AdminUserForm
            user={this.state.user}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/admin/users`}
            formTitle="Update User"
          />
        }
      </div>
    )
  }
}

AdminUpdateUser.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    selectedUser: store.user.selected
    , userMap: store.user.byId
  }
}

export default connect(
  mapStoreToProps
)(AdminUpdateUser);
