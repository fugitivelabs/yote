import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';

const NotFound = () => {
  return (
    <DefaultLayout title="404: Page not found">
      <h1> Whoops!</h1>
      <h2>We can't find this page.</h2>
      <h4>If you think this is an error, please contact the site administrator.</h4> 
      <Link to='/'>
        Go home
      </Link>
    </DefaultLayout>
  )
}

export default NotFound;