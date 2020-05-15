/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux'; 
import configureStore from './js/store/configureStore'; 
import AppContainer from './js/AppContainer'; 
import { PersistGate } from 'redux-persist/integration/react'; 

class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {

    const configuredStore = configureStore();

    return (
      <Provider store={configuredStore.store}>
        <PersistGate loading={null} persistor={configuredStore.persistor}>
          <AppContainer/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
