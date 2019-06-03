/*******

Main App 

Sets up Redux store/state and loads the main Root file

*******/

// import primary libraries
import React from 'react';
import { Provider } from 'react-redux';

import { createSwitchNavigator, createAppContainer } from 'react-navigation'; 

// import components
import configureStore from './js/store/configureStore';
import AuthLoadingScreen from './js/navigation/AuthLoadingScreen'
import AppStack from './js/navigation/AppStack';
import AuthStack from './js/navigation/AuthStack'; 

const RootStack = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen
    , App: AppStack
    , Auth: AuthStack
  }, 
  {
    initialRouteName: 'AuthLoading'
  }
))

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
      , store: configureStore(() => this.setState({isLoading: false}))
    };
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <RootStack/>
      </Provider>
    );
  }
}

export default App;
