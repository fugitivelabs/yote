import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';

import routes from './config/routes';

function App() {
  return (
    <>
      {/* import all resource routers here */}
      {/* redirect for now since there is no view for the base route */}
      <Route exact path='/'>
        <Redirect to="/products" />
      </Route>      
      {routes}
    </>
  );
}

export default App;
