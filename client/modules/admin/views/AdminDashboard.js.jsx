/**
 * Living style-guide for this Yote application
 *
 * TODO:  This needs a lot of work
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import admin components

class AdminDashboard extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return  (
      <div className="flex">
        <section className="section">
          <div className="yt-container style-guide">
            <h3> Admin Dashboard </h3>
            <div className="content" style={{height:"200vh"}}/>
          </div>
        </section>
      </div>
    )
  }
}

export default AdminDashboard;
