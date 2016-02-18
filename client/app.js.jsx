import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import routes from './routes.js.jsx';


import configureStore from './configureStore';

const store = configureStore();

// Required for replaying actions from devtools to work
// reduxRouterMiddleware.listenForReplays(store);

// store.dispatch(actions.fetchList()).then(() => {
//   console.log("State after fetch:")
//   console.log(store.getState())
// })


render(
  (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>

  )
  , document.getElementById('react')
)
