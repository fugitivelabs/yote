import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux';

import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  console.log("initialState");
  console.log(initialState);
  // const reducer = combineReducers(
  //   Object.assign({}, reducers, {
  //   routing: routeReducer
  // }));

  const jadeInitialState = {
    user: {
      single: {
        user: window.currentUser || {}
      }
    }
  };

  const loggerMiddleware = createLogger();


  const store = createStore(
    rootReducer,
    jadeInitialState,
    applyMiddleware(
      thunkMiddleware
  
      , loggerMiddleware
    )
  )

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
