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
    console.log("SUBMIT");
    console.log(this.state.user);
    this.props.dispatch(userSingleActions.sendRegister(this.state.user));
  }

  render() {
    const { user } = this.state;
    const isEmpty = !user || (user.username === null || user.username === undefined);
    return  (
      <div>
        { isEmpty ? "Loading..." :
          <UserRegisterForm
            user={user}
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
          />
        }
      </div>
    )
  }
}

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.single.newUser }
}

export default connect(
  mapStoreToProps
)(UserRegister);
