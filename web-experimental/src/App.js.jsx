import React from 'react';
import './App.css';
import ProductRouter from './resources/product/ProductRouter.js.jsx';
import ProductRouter2 from './resources/product2/ProductRouter.js.jsx';
import UserRouter from './resources/user/UserRouter.js.jsx';
function App() {
  return (
    <>
      {/* import all resource routers here */}
      <ProductRouter />
      <ProductRouter2 />
      <UserRouter />
    </>
  );
}

export default App;
