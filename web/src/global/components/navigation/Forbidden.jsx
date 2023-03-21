import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';

const Forbidden = () => {
  return (
    <DefaultLayout title="Forbidden">
      <h1> Whoops!</h1>
      <h2>Looks like you're not authorized to view this page.</h2>
      <h4>If you think this is an error, please contact the site administrator.</h4>
      <Link to={'/'}>
        Go home
      </Link>
    </DefaultLayout>
  )
}

export default Forbidden;