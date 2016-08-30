import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return(
    <footer className="footer">
      <div className="yt-container" style={{padding: "20px"}}>
        <div className="yt-row space-between">
          <div className="yt-col">

            <span>&copy; 2016 Fugitive Labs, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer;
