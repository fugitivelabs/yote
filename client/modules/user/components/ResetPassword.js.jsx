import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { TextInput } from '../../../global/components/forms';

//actions
import * as userSingleActions from '../actions/userSingleActions';

//components

class ResetPassword extends Base {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    // console.log("Mounted");
    this.props.dispatch(userSingleActions.sendCheckResetHex(this.props.params.hex));
  }

  _handleFormChange(e) {
    var nextState = this.state;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userSingleActions.sendResetPassword(this.props.user.resetUserId, this.state.password));
  }

  render() {

    // console.log("RENDER");
    // console.log(this.props.user);

    return  (
      <div>
        <div className="yt-container">
          <h1> Reset Password </h1>
          <div className="yt-row center-horiz">
            <div className="form-container">

              { this.props.user.isFetching 
                ? 
                  <h3>Loading...</h3>

                :
                  <div>
                    { this.props.user.resetTokenValid 
                      ? 
                      <form name="userForm" className="card user-form" onSubmit={this._handleFormSubmit}>
                        <span></span>
                        <TextInput
                          name="password"
                          label="New Password"
                          value={this.state.password}
                          change={this._handleFormChange}
                          placeholder="New Password"
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


                      :
                      <div>
                        <h2>The password reset token is invalid or has expired. Please visit the forgot password page to request a new token.</h2>
                        <Link to={"/user/forgotpassword"} className="yt-btn fowler small"> Forgot Password </Link>
                      </div>

                    }



                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.single }
}

export default connect(
  mapStoreToProps
)(ResetPassword);
