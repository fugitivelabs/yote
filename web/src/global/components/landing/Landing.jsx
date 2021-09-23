import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const Landing = () => {
  return (
    <DefaultLayout title="Yote React Web">
      <h1> Welcome to Yote!</h1>
      <h4> Check out the docs on <a href="https://fugitivelabs.github.io/yote/"> GitHub </a></h4>
    </DefaultLayout>
  )
}

export default Landing;