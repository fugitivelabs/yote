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

class AdminCreateUser extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(JSON.stringify(props.defaultUser))
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    let nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendCreateUser(this.state.user)).then((action) => {
      if(action.success) {
        browserHistory.push('/admin/users');
      } else {
        alert("ERROR CREATING USER: ", action.message);
      }
    });
  }

  render() {
    const { user } = this.state;
    const isEmpty = !user || (user.username === null || user.username === undefined);;
    return (
      <div>
        { isEmpty ?
          <h2> Loading... </h2>
          :
          <AdminUserForm
            user={this.state.user}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/admin/users`}
            formTitle="Create User"
          />
        }
      </div>
    )
  }
}

AdminCreateUser.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    defaultUser: store.user.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(AdminCreateUser);
