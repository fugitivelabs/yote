// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import global components
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.js.jsx';

const NotFound = () => {
  return(
    <DefaultLayout>
      <div className="flex column">
        <section className="section white-bg the-404">
          <div className="hero flex three-quarter ">
            <div className="yt-container slim">
              <h1> 404: <span className="light-weight">Page not found</span></h1>
              <hr/>
              <h4><Link to="/" className="action-link">Head back home <i className="ion ion-ios-arrow-right"></i></Link></h4>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}

export default NotFound;
