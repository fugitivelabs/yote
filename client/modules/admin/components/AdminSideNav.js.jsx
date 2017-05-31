import React from 'react';
import PropTypes from 'prop-types';
import Base from '../../../global/components/BaseComponent.js.jsx';
import { Router, Route, Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
// import Study from "../StudyHandler";
// import Site from "../../site/SiteHandler";

// import actions
import * as userActions from '../../user/userActions';

class AdminSideNav extends Base {
  constructor(props, context) {
    super(props);
    this._bind(
      '_handleLogout'
    );
  }

  _handleLogout() {
    const { dispatch } = this.props;
    dispatch(userActions.sendLogout()).then((res) => {
      if(res.success) {
        //redirect
        browserHistory.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + res.message);
      }
    })
  }

  render() {
    return(
      <div className="sidebar">
        <div className="nav-header"> Admin Dashboard </div>
        <ul className="side-nav">
          <li>
            <Link to="/admin/style-guide" activeClassName="active" >Styleguide</Link>
          </li>
        </ul>
        <hr/>
        <ul className="side-nav">
          <li>
            <Link to="/admin/users" activeClassName="active" >Yote Users</Link>
          </li>

        </ul>
        <hr/>
        <ul className="side-nav">
          <li>
            <a onClick={this._handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    )
  }

}

AdminSideNav.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStoreToProps = (store) => {
  return {
  }
}

export default connect(mapStoreToProps
, null, null, {
  pure:false
})(AdminSideNav);
