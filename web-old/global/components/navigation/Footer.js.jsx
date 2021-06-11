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
            <span>&copy; {new Date().getFullYear()} Fugitive Labs, LLC | <i>powered by <a href="https://github.com/fugitivelabs/yote" target="_blank">Yote</a></i></span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
