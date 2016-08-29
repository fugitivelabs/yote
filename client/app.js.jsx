import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';

//NOTE: not the same as react-router/applyRouterMiddleware. using that breaks relative links
//TODO: in future, check to see if react-router one starts working and remove this dependency
import applyRouterMiddleware from 'react-router-apply-middleware';

// import { createStore, applyMiddleware } from 'redux';
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
        render={applyRouterMiddleware(useRelativeLinks(), useScroll() )}
        routes={routes}
      />
    </Provider>

  )
  , document.getElementById('application-main-yote')
)
