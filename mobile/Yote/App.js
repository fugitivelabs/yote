/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux'; 
import store from './js/config/store'; 
import AuthNavigator from './js/AuthNavigator'; 
import { PersistGate } from 'redux-persist/integration/react'; 

class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {

    const configuredStore = store();

    return (
      <Provider store={configuredStore.store}>
        <PersistGate loading={null} persistor={configuredStore.persistor}>
          <AuthNavigator/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
