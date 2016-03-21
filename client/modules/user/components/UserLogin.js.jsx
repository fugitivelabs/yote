import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

//actions
import * as userActions from '../actions/userSingleActions';

//components
import UserLoginForm from './UserLoginForm.js.jsx';

class UserLogin extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  // componentWillMount() {
  //   const { dispatch } = this.props;
  //   dispatch(singleActions.setupNewPost())
  //   // this.props.dispatch(singleActions.setupNewPost()).then(() =>{
  //   //     console.log(this.props);
  //   //   });
  // }

  componentWillReceiveProps(nextProps) {
    console.log("BLAH");
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

const mapStateToProps = (state, ownProps) => {
  return { user: state.user.single.user }
}

export default connect(
  mapStateToProps
)(UserLogin);
