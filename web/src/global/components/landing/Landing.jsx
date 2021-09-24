import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const Landing = () => {
  return (
    <DefaultLayout title="Yote React Web">
      <h1 className="text-center"> Welcome to Yote!</h1>
      <p className="text-center"> Check out the docs on <a href="https://fugitivelabs.github.io/yote/"> GitHub </a></p>
    </DefaultLayout>
  )
}

export default Landing;