import React, { Suspense, useEffect } from 'react';
import './App.css';

import routes from './config/routes';
import DefaultLayout from './global/components/layouts/DefaultLayout';

function App() {
  useEffect(() => {
    // we are using lazy loading to load our resource routers to reduce the initial bundle size
    // we can preload the resource routers here so they are ready to go once the user needs them
    import('./resources/product/ProductRouter');
    import('./resources/user/UserRouter');
    // add any other top level resource routers here that you want to preload
  }, []) // run once on mount

  // because we are using lazy loading at the route level, we need to wrap our routes in a Suspense component which will show a fallback while the route is loading
  // if we want a more specific fallback somewhere down the tree, we can add a Suspense component there as well (most likely in an individual resource router)
  return (
    <Suspense fallback={<DefaultLayout.Skeleton />}>
      {routes}
    </Suspense>
  );
}

export default App;
