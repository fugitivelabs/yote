import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';

import routes from './config/routes';

function App() {
  return (
    <>
      {routes}
    </>
  );
}

export default App;
