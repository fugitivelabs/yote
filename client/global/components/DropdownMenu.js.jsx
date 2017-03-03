import React, { PropTypes } from 'react';
import Base from "./BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import * as userActions from '../../modules/user/userActions';

class DropdownMenu extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_logout'
    )
  }

  _logout(e) {
    console.log("logout function called");
    this.props.dispatch(userActions.sendLogout()).then((data) => {
      if(data.success) {
        //redirect
        browserHistory.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + data.message);
      }
    })
  }


  render() {
    if(this.props.isOpen) {
      return(
        <ul className="dropMenu">
          { this.props.user.username 
            ? 
              <div>
                <li className="dropdown-header"> Logged in as {this.props.user.firstName} {this.props.user.lastName}</li>
                { this.props.user.roles && this.props.user.roles.indexOf('admin') > -1 
                  ?
                  <li><a href="/admin"> Admin </a></li>
                  : ''
                }
                <li role="separator" className="divider"><br/></li>
                <li><a onClick={this._logout}>Logout</a></li>
              </div>
            :
              <div>
                <li><a href="/user/login">Log In</a></li>
                <li role="separator" className="divider"><br/></li>
                <li><a href="/user/register">Register</a></li>
              </div>
          }
        </ul>
      )
    } else {
      return null;
    }
  }
}

DropdownMenu.propTypes = {
  dispatch: PropTypes.func.isRequired
  , isOpen: PropTypes.bool.isRequired
}

const mapStoreToProps = (store) => {
  return { user: store.user.loggedIn.user }
}

export default connect(
  mapStoreToProps
)(DropdownMenu);