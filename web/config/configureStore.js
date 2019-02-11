/* global process */

/**
 * configureStore builds the Redux store for the application
 */

// import primary libraries
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
// import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// import main application reducers
import * as resourceReducers from './resourceReducers.js';

// combine application reducers with redux routing
const rootReducer = combineReducers({
  routing: routerReducer
  , ...resourceReducers
});

const history = createHistory();

// let process = global.process;

export default function configureStore(initialState) {
  // console.log("initialState");
  // console.log(initialState);

  /**
   * Setup server rendering by uncommenting below
   * TODO: get initial state from server and populate
   */
  // const jadeInitialState = {
  //   user: {
  //     loggedIn: {
  //       user: window.currentUser || {}
  //     }
  //   }
  // };

  const middlewares = [thunk, routerMiddleware(history)];

  if(process.env.NODE_ENV != "production") {
    // don't log redux changes in production
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer
    , routerReducer
    // , jadeInitialState
    , applyMiddleware(
      ...middlewares
    )
  )

  // // Allow hot-reloading
  // // TODO: check that this works as intended...
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
