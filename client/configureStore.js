/**
 * configureStore builds the Redux store for the application
 */

// import primary libraries
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { syncHistoryWithStore } from 'react-router-redux';

// import main application reducer
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}, history) {
  // console.log("initialState");
  // console.log(initialState);

  // TODO: get initial state from server and populate
  // const jadeInitialState = {
  //   user: {
  //     loggedIn: {
  //       user: window.currentUser || {}
  //     }
  //   }
  // };

  const middlewares = [thunkMiddleware];

  if(process.env.NODE_ENV != "production") {
    // don't log redux changes in production
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer
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
