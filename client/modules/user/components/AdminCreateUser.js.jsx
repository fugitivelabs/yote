import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//actions
import * as userActions from '../userActions';

//components
import AdminUserForm from './AdminUserForm.js.jsx';

class AdminCreateUser extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(JSON.stringify(this.props.defaultUser))
    }

    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    
  }

  _handleFormChange(e) {
    var nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.user);
    this.props.dispatch(userActions.sendCreateUser(this.state.user)).then((result) => {
      if(result.success) {
        browserHistory.push('/admin/users');
      } else {
        alert("ERROR CREATING USER: " + result.message);
      }
    });
  }

  render() {
    const { user } = this.state;
    const isEmpty = !user || (user.username === null || user.username === undefined);;
    return (
      <div>
        { isEmpty
          ? <h2> Loading... </h2>
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
