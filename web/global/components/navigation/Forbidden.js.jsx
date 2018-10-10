// import primary libraries
import React from 'react';
import { Link } from 'react-router-dom';

// import global components
import DefaultLayout from '../../../global/components/layouts/DefaultLayout.js.jsx';

const Forbidden = () => {
  return(
    <DefaultLayout>
      <div className="flex column">
        <section className="section white-bg the-404">
          <div className="hero flex three-quarter ">
            <div className="yt-container slim">
              <h1> Whoops! <span className="light-weight">Looks like you're not authorized to view this page.</span></h1>
              <hr/>
              <h4>If you think this is an error, please contact the site administrator. Or you can just <Link to="/" className="action-link">head back home <i className="ion ion-ios-arrow-right"></i></Link></h4>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}

export default Forbidden;
