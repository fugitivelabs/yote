import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const Landing = () => {
  return (
    <DefaultLayout title="Yote React Web">
      <section class="p-2">
        <h1 className="md:text-center text-3xl"> Welcome to Yote!</h1>
        <p className="md:text-center"> Check out the docs on <a href="https://fugitivelabs.github.io/yote/"> GitHub </a></p>
      </section>
    </DefaultLayout>
  )
}

export default Landing;