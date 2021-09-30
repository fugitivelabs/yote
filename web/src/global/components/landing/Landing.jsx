import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const Landing = () => {
  return (
    <DefaultLayout title="Yote React Web">
      <section className="p-2">
        <h1 className="p-2 md:text-center text-3xl"> Welcome to Yote!</h1>
        <p className="p-2 md:text-center"> Check out the docs on <a href="https://fugitivelabs.github.io/yote/"> GitHub </a></p>
      </section>
    </DefaultLayout>
  )
}

export default Landing;