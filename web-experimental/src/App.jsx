import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';
import ProductRouterRTK from './resources/productRTK/ProductRouter.jsx';
import ProductRouter from './resources/product/ProductRouter.jsx';
import UserRouter from './resources/user/UserRouter.jsx';
function App() {
  return (
    <>
      {/* import all resource routers here */}
      {/* redirect for now since there is no view for the base route */}
      <Route exact path='/'>
        <Redirect to="/products" />
      </Route>      
      <ProductRouter />
      <ProductRouterRTK />
      <UserRouter />
    </>
  );
}

export default App;
