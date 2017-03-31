// import primary libraries
import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../userActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import form components
import { TextInput } from '../../../global/components/forms';


class ForgotPassword extends Base {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    var nextState = this.state;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendForgotPassword(this.state.username)).then((action) => {
      if(action.success) {
        alert("You should receive an email shortly with password reset instructions.");
        browserHistory.push('/');
      } else {
        alert("There was a problem reseting your password on the server. Please contact a site admin.");
      }
    })
  }

  render() {
    return  (
      <div>
        <div className="yt-container">
          <h1> Forgot Password </h1>
          <div className="yt-row center-horiz">
            <div className="form-container">
              <form name="userForm" className="card user-form" onSubmit={this._handleFormSubmit}>
                <span></span>
                <TextInput
                  name="username"
                  label="Email Address"
                  value={this.state.username}
                  change={this._handleFormChange}
                  placeholder="Email Address"
                  required={true}
                />
                <div className="input-group">
                  <div className="yt-row space-between">
                    <button className="yt-btn " type="submit" > Send Password Reset </button>
                  </div>
                  <br/>
                  <div className="yt-row space-between u-pullRight">
                    <Link to={"/user/login"} className="yt-btn fowler x-small"> Back To Login </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn.user }
}

export default connect(
  mapStoreToProps
)(ForgotPassword);
