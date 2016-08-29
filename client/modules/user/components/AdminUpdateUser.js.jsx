import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

//actions
import { singleActions } from '../actions';


//components
import UserRegisterForm from './UserRegisterForm.js.jsx';

class UserRegister extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;

    //TODO: figure out how to navigate away if user is logged in

    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(singleActions.setupNewUser());
  }

  _handleFormChange(e) {
    var nextState = this.state.newUser;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    this.props.dispatch(singleActions.sendUserRegister(this.state.newUser));
  }

  render() {
    console.log(this.props);
    const { user, newUser } = this.props;
    var isLoggedIn = user._id ? true : false;
    console.log("isLoggedIn", isLoggedIn);
    var isAdmin = isLoggedIn && user.roles.indexOf('admin') > -1 ? true: false;
    console.log("isAdmin", isAdmin);
    const isEmpty = !newUser;
    return  (
      <div>
        {!isLoggedIn || !isAdmin
          ?
            <div>
              <h3> Sorry, you don't have permission to view this page</h3>
            </div>
          :
          <div>

            {isEmpty
              ? <h2> Loading... </h2>
            :
              <UserRegisterForm
                user={this.state.newUser}
                handleFormSubmit={this._handleFormSubmit}
                handleFormChange={this._handleFormChange}
                />

            }
          </div>
        }
      </div>
    )
  }
}

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired
}

UserRegister.defaultProps = {
  newUser: {
    username: ""
    , password: ""
    , firstName: ""
    , lastName: ""
    , roles: []
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.single.user
    , newUser: state.user.single.newUser
  }
}

export default connect(
  mapStateToProps
)(UserRegister);
