/********

Root Component

Manually decide if application will require user authentication and login, 
and then calls createRootNavigator

********/

// import primary libraries
import React, { Component } from 'react';
import Binder from './global/Binder';
import { connect } from 'react-redux';

// react-native 
import {
  AppState
  , Platform
  , StatusBar
  , StyleSheet
  , Text
  , View
} from 'react-native'; 

// custom components
import AppNavigator from './global/navigation/AppNavigator'; 
import { createRootNavigator } from './router'; 

class Root extends Binder {
  constructor(props) {
    super(props);
    this._bind(
      '_handleAppStateChange'
    );
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange(appState) {
    if (appState === 'background') {
     }
  }

  render() {
    const requireLogin = true; // Change to true for applications that require user authentication before entry
    const Layout = createRootNavigator(requireLogin, this.props.isLoggedIn);
    return <Layout/>;
  }
}


const mapStoreToProps = (store) => {
  return {
    isLoggedIn: store.user.loggedIn.apiToken
  }
}

export default connect(
  mapStoreToProps
)(Root);
