import React from 'react';
import PropTypes from 'prop-types';
import Base from '../../../global/components/BaseComponent.js.jsx';
import { NavLink, withRouter } from 'react-router-dom';
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
    const { dispatch, history } = this.props;
    dispatch(userActions.sendLogout()).then((res) => {
      if(res.success) {
        //redirect
        history.push('/');
      } else {
        alert("ERROR LOGGING OUT - " + res.message);
      }
    })
  }

  render() {
    return(
      <div className="sidebar">
        <div className="nav-header">Yote Admin </div>

        <ul className="side-nav">
          <li>
            <NavLink exact to="/admin" activeClassName="active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/style-guide" activeClassName="active" >Style Guide</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="active" >Users</NavLink>
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

export default withRouter(
  connect(mapStoreToProps
  , null, null, {
    pure:false
  })(AdminSideNav)
);
