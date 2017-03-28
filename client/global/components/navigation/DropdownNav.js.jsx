/**
 * Basic dropdown navigation menu to be used with default global TopNav
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import actions
import * as userActions from '../../../modules/user/userActions';

// import components
import Base from "../BaseComponent.js.jsx";

class DropdownNav extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_logout'
    )
  }

  _logout(e) {
    this.props.dispatch(userActions.sendLogout()).then((action) => {
      if(action.success) {
        // redirect to index
        browserHistory.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + action.message);
      }
    })
  }

  render() {
    if(this.props.isOpen) {
      return(
        <ul className="dropMenu">
          { this.props.user.username ?
            <div>
              <li className="dropdown-header"> Logged in as {this.props.user.firstName} {this.props.user.lastName}</li>
              <li><Link to="/profile">Profile</Link></li>
            { this.props.user.roles && this.props.user.roles.indexOf('admin') > -1 ?
                <li><Link to="/admin"> Admin </Link></li>
                :
                null
              }
              <li role="separator" className="divider"><br/></li>
              <li><a onClick={this._logout}>Logout</a></li>
            </div>
            :
            <div>
              <li><Link to="/user/login">Log In</Link></li>
              <li role="separator" className="divider"><br/></li>
              <li><Link to="/user/register">Register</Link></li>
            </div>
          }
        </ul>
      )
    } else {
      return null;
    }
  }
}

DropdownNav.propTypes = {
  dispatch: PropTypes.func.isRequired
  , isOpen: PropTypes.bool.isRequired
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default connect(
  mapStoreToProps
)(DropdownNav);
