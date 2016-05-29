import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useRelativeLinks } from 'react-router-relative-links';
import useScroll from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import routes from './routes.js.jsx';

import configureStore from './configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  (
    <Provider store={store}>
      <Router
        history={history}
        render={applyRouterMiddleware(useScroll(), useRelativeLinks())}
        routes={routes}
      />
    </Provider>

  )
  , document.getElementById('react')
)
