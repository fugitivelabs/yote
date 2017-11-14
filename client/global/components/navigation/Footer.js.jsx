/**
 * Global application footer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Footer() {
  return(
    <footer className="footer">
      <div className="yt-container" style={{padding: "20px"}}>
        <div className="yt-row space-between">
          <div className="yt-col">
            <span>&copy; 2017 Fugitive Labs, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
