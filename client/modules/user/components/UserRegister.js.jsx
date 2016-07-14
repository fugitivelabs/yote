import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

//actions
import * as userSingleActions from '../actions/userSingleActions';

//components
import UserRegisterForm from './UserRegisterForm.js.jsx';

class UserRegister extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
 
 componentDidMount() {
  this.props.dispatch(userSingleActions.setupNewUser());
 }

  _handleFormChange(e) {
    var nextState = this.state.user;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendRegister(this.state.username, this.state.password));
  }

  render() {
    const { user } = this.state;
    return  (
      <div>
        <UserRegisterForm
          user={user}
          handleFormSubmit={this._handleFormSubmit}
          handleFormChange={this._handleFormChange}
        />
      </div>
    )
  }
}

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.single.user }
}

export default connect(
  mapStoreToProps
)(UserRegister);
