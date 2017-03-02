import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

//actions
import * as userActions from '../userActions';

//components
import UserLoginForm from './UserLoginForm.js.jsx';

class UserLogin extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: ''
        , password: ''
      }
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }

  _handleFormChange(e) {
    var nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendLogin(this.state.username, this.state.password));
  }

  render() {
    const { user } = this.state;
    return  (
      <div>
        <UserLoginForm
          user={user}
          handleFormSubmit={this._handleFormSubmit}
          handleFormChange={this._handleFormChange}
        />
      </div>
    )
  }
}

UserLogin.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.single.user }
}

export default connect(
  mapStoreToProps
)(UserLogin);
