import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//actions
import * as userActions from '../userActions';

//components
import UserRegisterForm from './UserRegisterForm.js.jsx';

class UserRegister extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.defaultUser ? JSON.parse(JSON.stringify(this.props.defaultUser)): null
      //don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
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
    this.props.dispatch(userActions.sendRegister(this.state.user)).then((res) => {
      if(res.success) {
        //redirect
        browserHistory.push('/');
      } else {
        alert(res.error);
      }
    })
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
  return {
    defaultUser: store.user.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(UserRegister);
