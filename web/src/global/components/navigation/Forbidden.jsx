import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../base/Button';

const Forbidden = () => {
  return (
    <DefaultLayout title="Forbidden">
      <h1> Whoops! <span className="font-light">Looks like you're not authorized to view this page.</span></h1>
      <h4>If you think this is an error, please contact the site administrator.</h4>
      <Button link='/'>
        Go home
      </Button>
    </DefaultLayout>
  )
}

export default Forbidden;