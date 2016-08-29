import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent.js.jsx';
import { Router, Route, Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
// import Study from "../StudyHandler";
// import Site from "../../site/SiteHandler";

// import actions
import { singleActions as userSingleActions } from '../../user/actions';
export default class SideNav extends Base {
  constructor(props, context) {
    super(props);
    this._bind(
      '_handleLogout'
    );
  }

  _handleLogout() {
    console.log("logout");
    const { dispatch } = this.props;
    dispatch(userSingleActions.sendUserLogout());
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

SideNav.propTypes = {
  dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  console.log("list state");
  console.log(state);
  return {
  }
}

export default connect(
  mapStateToProps
)(SideNav);
