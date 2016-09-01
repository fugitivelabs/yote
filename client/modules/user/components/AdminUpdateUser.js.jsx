import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

//actions
import { singleActions } from '../actions';


//components
import AdminUserForm from './AdminUserForm.js.jsx';

class AdminUpdateUser extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;

    //TODO: figure out how to navigate away if user is logged in

    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(singleActions.fetchSingleUser(params.userId));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }

  _handleFormChange(e) {
    var nextState = this.state.newUser;
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    this.props.dispatch(singleActions.sendUpdateUser(this.state.newUser)).then((result) => {
      if(result.success) {
        console.log("success");
        browserHistory.push('/admin/users')
      } else {
        console.log(result);
        alert("ERROR UPDATING USER: " + result.message);
      }
    });
  }

  render() {
    const { user, newUser } = this.props;
    var isLoggedIn = user._id ? true : false;
    console.log("isLoggedIn", isLoggedIn);
    var isAdmin = isLoggedIn && user.roles.indexOf('admin') > -1 ? true: false;
    console.log("isAdmin", isAdmin);
    const isEmpty = !newUser || (newUser.username === null || newUser.username === undefined);;
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
                <AdminUserForm
                  user={this.state.newUser}
                  formType="update"
                  handleFormSubmit={this._handleFormSubmit}
                  handleFormChange={this._handleFormChange}
                  cancelLink={`/admin/users`}
                  formTitle="Update User"
                />

            }
          </div>
        }
      </div>
    )
  }
}

AdminUpdateUser.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.single.user
    , newUser: store.user.single.newUser
  }
}

export default connect(
  mapStoreToProps
)(AdminUpdateUser);
