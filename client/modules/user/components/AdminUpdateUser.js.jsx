// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { history } from 'react-router-dom';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../userActions';

// import global components
import AlertModal from '../../../global/components/modals/AlertModal.js.jsx';
import Base from '../../../global/components/BaseComponent.js.jsx';

// import user components
import AdminUserForm from './AdminUserForm.js.jsx';

class AdminUpdateUser extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false
      , isInfoModalOpen: false
      , user: props.userMap[props.selectedUser.id] ? JSON.parse(JSON.stringify(props.userMap[props.selectedUser.id])) : {}
      // NOTE: we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
      , '_openAlertModal'
      , '_closeDeleteModal'
      , '_closeInfoModal'
      , '_confirmDelete'
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
        history.push('/admin/users')
      } else {
        alert("ERROR UPDATING USER: ", action.message);
      }
    });
  }

  _openAlertModal() {
    const { selectedUser, loggedInUser, userMap } = this.props;
    // make sure we're not deleting ourselves
    if(selectedUser.id === loggedInUser.user._id) {
      // (sigh) don't let them delete themself
      this.setState({isInfoModalOpen: true});
    } else {
      this.setState({isDeleteModalOpen: true});
    }
  }

  _closeDeleteModal() {
    this.setState({isDeleteModalOpen: false});
  }

  _confirmDelete() {
    const { dispatch } = this.props;
    dispatch(userActions.sendDelete(this.state.user._id)).then((result) => {
      if(result.success) {
        this._closeDeleteModal();
        history.push('/admin/users');
      } else {
        alert("There was a problem deleting the user from the server. Please try again.");
      }
    });
  }

  _closeInfoModal() {
    this.setState({isInfoModalOpen: false});
  }

  render() {
    const { selectedUser, userMap, loggedInUser } = this.props;
    const { user } = this.state;
    const isEmpty = !user || !user.username;
    return  (
      <div>
        { isEmpty ?
          <h2> Loading... </h2>
          :
          <AdminUserForm
            cancelLink={`/admin/users`}
            formTitle="Update User"
            formType="update"
            handleDeleteUser={this._openAlertModal}
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
            user={this.state.user}
          />
        }
        <AlertModal
          alertMessage={<div><strong>STOP!</strong> Are you <em>sure</em> you want to deleted this user? This cannot be undone.</div> }
          alertTitle="Delete User"
          closeAction={this._closeDeleteModal}
          confirmAction={this._confirmDelete}
          confirmText="Yes, Delete this user"
          declineAction={this._closeDeleteModal}
          declineText="Never mind"
          isOpen={this.state.isDeleteModalOpen}
          type="danger"
        />
        <AlertModal
          alertMessage="Silly noob, we can't let you delete yourself..."
          alertTitle="Nope"
          closeAction={this._closeInfoModal}
          confirmAction={this._closeInfoModal}
          confirmText="Gotcha, never mind"
          isOpen={this.state.isInfoModalOpen}
          type="info"
        />
      </div>
    )
  }
}

AdminUpdateUser.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    loggedInUser: store.user.loggedIn
    , selectedUser: store.user.selected
    , userMap: store.user.byId
  }
}

export default connect(
  mapStoreToProps
)(AdminUpdateUser);
